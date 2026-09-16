const mediaFrames = document.querySelectorAll("[data-video]");
const mediaControllers = new WeakMap();

function createMediaController(frame) {
  const source = frame.dataset.video;
  let media;
  let visible = false;
  let attempts = 0;

  function playIfVisible() {
    if (visible && !document.hidden && media) {
      // Embedded previews may block autoplay; native controls remain available.
      media.play().catch(() => {});
    }
  }

  function showError() {
    const panel = document.createElement("div");
    panel.className = "media-placeholder media-error";
    const message = document.createElement("span");
    message.textContent = "Video could not be loaded.";
    const retry = document.createElement("button");
    retry.type = "button";
    retry.textContent = "Retry";
    retry.addEventListener("click", () => {
      attempts = 0;
      load();
    });
    const link = document.createElement("a");
    link.href = source;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Open video";
    panel.append(message, retry, link);
    frame.replaceChildren(panel);
  }

  function load() {
    if (!source) return;
    attempts += 1;
    const video = document.createElement("video");
    media = video;
    video.controls = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("aria-label", frame.dataset.label || "Demo video");

    let settled = false;
    const timeout = window.setTimeout(onError, 20000);
    function onReady() {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      playIfVisible();
    }
    function onError() {
      if (media !== video) return;
      window.clearTimeout(timeout);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("error", onError);
      video.pause();
      video.removeAttribute("src");
      video.load();
      media = null;
      showError();
      // Retry a transient preview/network failure once, then leave a manual retry.
      if (attempts < 2) load();
    }

    // Let the media element load directly. HEAD/fetch may fail in preview
    // webviews even when the same URL can be played by a video element.
    video.addEventListener("loadeddata", onReady, { once: true });
    video.addEventListener("error", onError);
    frame.replaceChildren(video);
    video.src = source;
    video.load();
  }

  return {
    setVisible(value) {
      visible = value;
      if (!attempts && visible) load();
      if (visible) playIfVisible();
      else media?.pause();
    },
    syncVisibility() {
      if (document.hidden) media?.pause();
      else playIfVisible();
    },
  };
}

mediaFrames.forEach((frame) => mediaControllers.set(frame, createMediaController(frame)));

if ("IntersectionObserver" in window) {
  const mediaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        mediaControllers.get(entry.target).setVisible(entry.isIntersecting);
      });
    },
    { rootMargin: "320px 0px" },
  );

  mediaFrames.forEach((frame) => mediaObserver.observe(frame));
} else {
  mediaFrames.forEach((frame) => mediaControllers.get(frame).setVisible(true));
}

document.addEventListener("visibilitychange", () => {
  mediaFrames.forEach((frame) => mediaControllers.get(frame).syncVisibility());
});

function scrollToHash() {
  if (!window.location.hash) {
    return;
  }

  const target = document.querySelector(window.location.hash);
  target?.scrollIntoView({ block: "start" });
}

window.addEventListener("load", () => window.requestAnimationFrame(scrollToHash));
window.addEventListener("hashchange", scrollToHash);
