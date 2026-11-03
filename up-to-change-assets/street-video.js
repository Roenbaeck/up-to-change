const video = document.querySelector(".street-video");
const toggle = document.querySelector(".video-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateToggle() {
  const playing = !video.paused;
  const label = playing ? toggle.dataset.pauseLabel : toggle.dataset.playLabel;
  toggle.dataset.playing = String(playing);
  toggle.setAttribute("aria-label", label);
  toggle.title = label;
}

function playVideo() {
  if (!video.hasAttribute("src")) {
    video.src = video.dataset.src;
  }
  video.play().catch(updateToggle);
}

video.addEventListener("play", updateToggle);
video.addEventListener("playing", () => video.classList.add("has-frame"));
video.addEventListener("pause", updateToggle);
video.addEventListener("error", () => {
  video.classList.remove("has-frame");
  toggle.hidden = true;
});

toggle.addEventListener("click", () => {
  if (video.paused) {
    playVideo();
  } else {
    video.pause();
  }
});

reducedMotion.addEventListener("change", (event) => {
  if (event.matches) {
    video.pause();
  }
});

updateToggle();
toggle.hidden = false;
if (!reducedMotion.matches) {
  playVideo();
}
