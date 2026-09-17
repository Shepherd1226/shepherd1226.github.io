// Adapted from Album/js/main.js: the same pinecone, timing, jump arc, and landing bounce.
(() => {
  if (!window.anime) return;

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  // New publication cards automatically contribute their media as landing spots.
  const targetSelector = "[data-squirrel-perch], .publication-media";
  const squirrel = document.createElement("button");
  squirrel.type = "button";
  squirrel.id = "squirrel-mascot";
  squirrel.className = "squirrel-mascot";
  squirrel.innerHTML = '<span class="mascot-visual" aria-hidden="true">🐿️</span>';

  const pinecone = document.createElement("button");
  pinecone.type = "button";
  pinecone.id = "pinecone-mascot";
  pinecone.className = "pinecone-mascot";
  pinecone.innerHTML = `<span class="mascot-visual" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" focusable="false"><path fill="#5D4037" d="M12 2c2.8 0 5.4 2.2 5.9 5H6.1c.5-2.8 3.1-5 5.9-5z"/><path fill="#8D6E63" d="M7 7h10c0 4.4-2.2 9.4-5 13-2.8-3.6-5-8.6-5-13z"/><path fill="#3E2723" d="M11 0h2v3h-2z"/><path fill="#795548" d="M12 7v13c2.5-3.4 4-8.1 4-13h-4z"/></svg></span>`;
  document.body.append(squirrel, pinecone);

  let timer;
  let session = 0;
  let currentTarget = null;
  let pineconeAvailable = false;
  let staticMode = false;
  let navigationTimer;
  const clickInterval = 200;
  let clickTarget = null;
  let clickCount = 0;
  let lastClickTime = 0;

  const resetClicks = () => {
    clickTarget = null;
    clickCount = 0;
    lastClickTime = 0;
  };

  const setVisible = (element, visible) => {
    if (!visible && clickTarget === element) resetClicks();
    element.style.opacity = visible ? "1" : "0";
    element.style.visibility = visible ? "visible" : "hidden";
    element.style.pointerEvents = visible ? "auto" : "none";
    element.tabIndex = visible ? 0 : -1;
  };
  const updateLabels = () => {
    const chinese = document.documentElement.lang.startsWith("zh");
    squirrel.setAttribute("aria-label", chinese ? "松鼠，前往个人主页" : "Squirrel, visit my homepage");
    pinecone.setAttribute("aria-label", chinese ? "松果" : "Pinecone");
  };
  const showPinecone = () => {
    pineconeAvailable = true;
    if (clickTarget === pinecone) resetClicks();
    updateLabels();
    setVisible(pinecone, true);
  };
  const hidePinecone = () => {
    pineconeAvailable = false;
    updateLabels();
    setVisible(pinecone, false);
  };

  const clickFeedback = (element) => {
    const visual = element.querySelector(".mascot-visual");
    visual.getAnimations().forEach((animation) => animation.cancel());
    visual.animate(motionPreference.matches
      ? [{ filter: "brightness(1.5)" }, { filter: "brightness(1)" }]
      : [{ transform: "scale(1.12)" }, { transform: "scale(0.82)" }, { transform: "scale(1.12)" }],
    { duration: 220, easing: "ease-out" });
  };
  const navigate = (url) => {
    if (navigationTimer) return;
    // Give the press feedback a moment to register before leaving the page.
    navigationTimer = setTimeout(() => window.location.assign(url), 140);
  };

  const countClick = (element, url) => {
    if (navigationTimer || element.style.visibility !== "visible") return;
    if (element === pinecone && !pineconeAvailable) return;
    clickFeedback(element);
    const now = performance.now();
    if (clickTarget !== element || now - lastClickTime > clickInterval) {
      clickCount = 0;
    }
    clickTarget = element;
    lastClickTime = now;
    clickCount += 1;
    if (clickCount === 5) navigate(url);
  };
  squirrel.addEventListener("click", () => countClick(squirrel, "https://shepherd1226.github.io/"));
  pinecone.addEventListener("click", () => countClick(pinecone, "https://shepherd1226.github.io/Album"));
  // A click elsewhere also breaks the sequence; the animation never pauses.
  document.addEventListener("click", (event) => {
    if (!squirrel.contains(event.target) && !pinecone.contains(event.target)) resetClicks();
  }, true);

  const canAnimate = () => !motionPreference.matches && !document.hidden;
  const isVisible = (element) => {
    const rect = element.getBoundingClientRect();
    const headerBottom = document.querySelector(".site-header").getBoundingClientRect().bottom;
    // Only use visible top edges, leaving room for the mascot below the sticky header.
    return element.isConnected && rect.width > 0 && rect.height > 0
      && rect.top >= headerBottom + 32 && rect.top < window.innerHeight - 12
      && rect.right > 0 && rect.left < document.documentElement.clientWidth;
  };
  const getTopCenter = (element, size = 28) => {
    const rect = element.getBoundingClientRect();
    return {
      x: window.scrollX + Math.max(0, Math.min(
        rect.left + rect.width / 2 - size / 2,
        document.documentElement.clientWidth - size,
      )),
      y: rect.top + window.scrollY - size,
    };
  };
  const place = (element, position) => {
    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;
  };

  const performJump = (activeSession) => {
    if (activeSession !== session || !canAnimate()) return;
    const visibleTargets = [...document.querySelectorAll(targetSelector)].filter(isVisible);
    if (!visibleTargets.length) {
      timer = setTimeout(() => performJump(activeSession), 1000);
      return;
    }

    if (!currentTarget || !currentTarget.isConnected) {
      currentTarget = visibleTargets[Math.floor(Math.random() * visibleTargets.length)];
      place(squirrel, getTopCenter(currentTarget));
      setVisible(squirrel, true);
      timer = setTimeout(() => performJump(activeSession), 1000 + Math.random() * 1000);
      return;
    }

    const candidates = visibleTargets.filter((target) => target !== currentTarget);
    if (!candidates.length) {
      timer = setTimeout(() => performJump(activeSession), 1500);
      return;
    }
    const nextTarget = candidates[Math.floor(Math.random() * candidates.length)];
    let endPosition = getTopCenter(nextTarget);
    place(pinecone, getTopCenter(nextTarget, 22));
    showPinecone();
    anime({ targets: pinecone, scale: [0, 1], duration: 400, easing: "easeOutBack" });

    // Face the pinecone, then wait the same 0.8–1.2 seconds as in Album.
    let direction = endPosition.x > parseFloat(squirrel.style.left) ? -1 : 1;
    squirrel.style.transform = `scaleX(${direction})`;
    timer = setTimeout(() => {
      if (activeSession !== session || !canAnimate()) return;
      // Scrolling an existing pinecone out of view must not cancel its jump.
      // Only a removed landing element invalidates the pending destination.
      if (!nextTarget.isConnected) {
        hidePinecone();
        performJump(activeSession);
        return;
      }

      // Keep the actual departure position, even when it has scrolled off screen.
      // Re-read only the destination before takeoff, just as Album does.
      const startPosition = {
        x: parseFloat(squirrel.style.left),
        y: parseFloat(squirrel.style.top),
      };
      endPosition = getTopCenter(nextTarget);
      place(pinecone, getTopCenter(nextTarget, 22));
      const distance = Math.hypot(endPosition.x - startPosition.x, endPosition.y - startPosition.y);
      const duration = Math.min(Math.max(distance * 1.5, 600), 1200);
      const jumpHeight = Math.max(80, distance / 3);
      direction = endPosition.x > startPosition.x ? -1 : 1;
      squirrel.style.transform = `scaleX(${direction})`;

      anime({ targets: squirrel, left: endPosition.x, duration, easing: "linear" });
      anime({
        targets: squirrel,
        top: [
          { value: Math.min(startPosition.y, endPosition.y) - jumpHeight, easing: "easeOutQuad", duration: duration / 2 },
          { value: endPosition.y, easing: "easeInQuad", duration: duration / 2 },
        ],
        complete: () => {
          if (activeSession !== session) return;
          hidePinecone();
          anime({
            targets: squirrel,
            scaleY: [0.7, 1],
            scaleX: [direction * 1.3, direction],
            duration: 400,
            easing: "easeOutElastic",
            complete: () => {
              if (activeSession !== session) return;
              currentTarget = nextTarget;
              timer = setTimeout(() => performJump(activeSession), 1000 + Math.random() * 2000);
            },
          });
        },
      });
    }, 800 + Math.random() * 400);
  };

  const restart = (delay = 700) => {
    clearTimeout(timer);
    const activeSession = ++session;
    anime.remove([squirrel, pinecone]);
    const keepStaticPinecone = motionPreference.matches && staticMode && pineconeAvailable;
    setVisible(squirrel, false);
    if (!keepStaticPinecone) hidePinecone();
    squirrel.style.transform = "none";
    currentTarget = null;
    const researchWord = document.querySelector('[data-squirrel-perch="research"]');
    // A wrapped research word needs a clear landing space above its own line.
    // Measure without the previous spacing so resizing can also remove it again.
    researchWord.style.marginTop = "";
    const researchParagraph = researchWord.closest("p");
    const lineHeight = parseFloat(getComputedStyle(researchParagraph).lineHeight);
    if (researchWord.getBoundingClientRect().top - researchParagraph.getBoundingClientRect().top > lineHeight / 2) {
      researchWord.style.marginTop = "28px";
    }
    if (motionPreference.matches) {
      // Keep the two characters as stationary decorations when motion is reduced.
      place(squirrel, getTopCenter(document.querySelector(".profile-photo")));
      place(pinecone, getTopCenter(researchWord, 22));
      pinecone.style.transform = "none";
      setVisible(squirrel, true);
      if (!keepStaticPinecone) showPinecone();
      updateLabels();
      staticMode = true;
      return;
    }
    staticMode = false;
    if (canAnimate()) timer = setTimeout(() => performJump(activeSession), delay);
  };

  // Scroll leaves the current animation alone. Visibility is checked only when
  // choosing the next pinecone; actual layout changes still need fresh positions.
  window.addEventListener("resize", () => restart(), { passive: true });
  document.addEventListener("visibilitychange", () => restart());
  motionPreference.addEventListener("change", () => restart());
  document.querySelector(".language-toggle").addEventListener("click", () => restart());
  // Images and translated text can change landing positions without a window resize.
  let initialLayout = true;
  const layoutObserver = new ResizeObserver(() => {
    restart(initialLayout ? 1500 : 700);
    initialLayout = false;
  });
  // Observe stable containers: translations replace the research word's inline span,
  // and future publications can be added without registering individual landing spots.
  document.querySelectorAll("main > section, .research-summary, .profile-photo")
    .forEach((target) => layoutObserver.observe(target));
  restart(1500);
})();
