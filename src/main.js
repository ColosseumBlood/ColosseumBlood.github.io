import "@fontsource/cinzel/latin-400.css";
import "@fontsource/cinzel/latin-500.css";
import "@fontsource/cinzel/latin-600.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "./style.css";

const REPOSITORY_URL = "https://github.com/romajs/game-downloads";
const PUBLIC_RELEASE_TAG = "colosseum-blood-latest";
const PUBLIC_RELEASE_URL =
  `${REPOSITORY_URL}/releases/tag/${PUBLIC_RELEASE_TAG}`;
const RELEASE_API =
  `https://api.github.com/repos/romajs/game-downloads/releases/tags/${PUBLIC_RELEASE_TAG}`;

const expectedAssets = {
  macos: "ColosseumBlood-macOS-universal.zip",
  windows: "ColosseumBlood-Windows-x86_64.zip",
  linux: "ColosseumBlood-Linux-x86_64.tar.gz",
};

function formatBytes(bytes) {
  const megabytes = bytes / 1024 / 1024;
  return `${megabytes >= 100 ? megabytes.toFixed(0) : megabytes.toFixed(1)} MB`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

async function loadLatestRelease() {
  const version = document.querySelector("[data-release-version]");
  const date = document.querySelector("[data-release-date]");
  const notes = document.querySelector("[data-release-notes]");
  const checksums = document.querySelector("[data-checksums]");

  try {
    const response = await fetch(RELEASE_API, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }

    const release = await response.json();
    version.textContent = `${release.name || release.tag_name} · Latest build`;
    date.textContent = `Updated ${formatDate(
      release.updated_at || release.published_at,
    )}`;
    notes.href = release.html_url;

    const checksumAsset = release.assets.find(
      (asset) => asset.name === "SHA256SUMS.txt",
    );
    if (checksumAsset) {
      checksums.href = checksumAsset.browser_download_url;
    }

    Object.entries(expectedAssets).forEach(([platform, filename]) => {
      const link = document.querySelector(`[data-download="${platform}"]`);
      const asset = release.assets.find((item) => item.name === filename);
      if (!link || !asset) return;

      link.href = asset.browser_download_url;
      link.querySelector("[data-download-size]").textContent = formatBytes(
        asset.size,
      );
      link.dataset.available = "true";
    });
  } catch (error) {
    version.textContent = "Public build coming soon";
    date.textContent = "The next arena release is being forged";
    notes.href = PUBLIC_RELEASE_URL;
    checksums.href = PUBLIC_RELEASE_URL;
    console.info("Latest release is not available yet.", error);
  }
}

function initializeRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  elements.forEach((element) => observer.observe(element));
}

function initializeHeader() {
  const header = document.querySelector("[data-header]");
  const update = () => header.classList.toggle("is-scrolled", scrollY > 48);
  update();
  addEventListener("scroll", update, { passive: true });
}

function initializeLightbox() {
  const dialog = document.querySelector("[data-lightbox-dialog]");
  const image = dialog.querySelector("[data-lightbox-image]");
  const close = dialog.querySelector("[data-lightbox-close]");

  document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const thumbnail = trigger.querySelector("img");
      image.src = thumbnail.currentSrc;
      image.alt = thumbnail.alt;
      dialog.showModal();
    });
  });

  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

initializeHeader();
initializeRevealAnimations();
initializeLightbox();
loadLatestRelease();
