const mediaFrames = document.querySelectorAll("[data-video], [data-gif]");

async function resourceExists(source) {
  // Browsers do not allow fetch/HEAD requests for local file URLs.
  if (window.location.protocol === "file:") {
    return true;
  }

  try {
    const response = await fetch(source, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

function createVideo(source, label) {
  const video = document.createElement("video");
  video.src = source;
  video.controls = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.setAttribute("aria-label", label || "Demo video");
  return video;
}

function createGif(source, label) {
  const image = document.createElement("img");
  image.src = source;
  image.alt = label || "Demo animation";
  image.loading = "lazy";
  image.decoding = "async";
  return image;
}

async function attachMedia(frame) {
  const placeholder = frame.firstElementChild?.cloneNode(true);
  const candidates = [
    { source: frame.dataset.video, type: "video" },
    { source: frame.dataset.gif, type: "gif" },
  ].filter((candidate) => candidate.source);

  for (const candidate of candidates) {
    try {
      if (!(await resourceExists(candidate.source))) {
        continue;
      }

      const media = candidate.type === "video"
        ? createVideo(candidate.source, frame.dataset.label)
        : createGif(candidate.source, frame.dataset.label);

      const loaded = await new Promise((resolve) => {
        const successEvent = candidate.type === "video" ? "loadedmetadata" : "load";
        const cleanup = () => {
          media.removeEventListener(successEvent, onLoad);
          media.removeEventListener("error", onError);
        };
        const onLoad = () => {
          cleanup();
          resolve(true);
        };
        const onError = () => {
          cleanup();
          media.remove();
          resolve(false);
        };

        media.addEventListener(successEvent, onLoad, { once: true });
        media.addEventListener("error", onError, { once: true });
        frame.replaceChildren(media);
      });

      if (loaded) {
        return;
      }
    } catch {
      // Try the next format; if none load, keep the release placeholder.
    }
  }

  if (!frame.firstChild && placeholder) {
    frame.replaceChildren(placeholder);
  }
}

mediaFrames.forEach(attachMedia);

function scrollToHash() {
  if (!window.location.hash) {
    return;
  }

  const target = document.querySelector(window.location.hash);
  target?.scrollIntoView({ block: "start" });
}

window.addEventListener("load", () => window.requestAnimationFrame(scrollToHash));
window.addEventListener("hashchange", scrollToHash);
