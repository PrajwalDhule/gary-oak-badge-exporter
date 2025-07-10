/**
 * Gary Oak Badge Exporter
 * Copyright (C) 2025 Prajwal Dhule
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import domtoimage from "dom-to-image-more";

const iconOptions = [
  { name: "ChatGPT", src: "/assets/chatgpt.png" },
  { name: "Claude", src: "/assets/claude.png" },
  { name: "Gemini", src: "/assets/gemini.png" },
  { name: "Cursor", src: "/assets/cursor.png" },
  { name: "VS Code", src: "/assets/vscode.png" },
  { name: "Neovim", src: "/assets/neovim.png" },
  { name: "TypeScript", src: "/assets/typescript.png" },
  { name: "Javascript", src: "/assets/javascript.png" },
  { name: "Python", src: "/assets/python.png" },
  { name: "Rust", src: "/assets/rust.png" },
  { name: "Go", src: "/assets/golang.png" },
  { name: "C++", src: "/assets/C++.png" },
  { name: "CSS", src: "/assets/css.png" },
  { name: "Aceternity UI", src: "/assets/aceternity-ui.png" },
  { name: "Tailwind", src: "/assets/tailwind.png" },
  { name: "Shadcn", src: "/assets/shadcn.png" },
  { name: "FFmpeg", src: "/assets/ffmpeg.png" },
  { name: "Docker", src: "/assets/docker.png" },
  { name: "Postgres", src: "/assets/postgres.png" },
  { name: "Supabase", src: "/assets/supabase.png" },
  { name: "Postman", src: "/assets/postman.png" },
  { name: "Git", src: "/assets/git.png" },
  { name: "Vercel", src: "/assets/vercel.png" },
  { name: "Nextjs", src: "/assets/nextjs.png" },
  { name: "Reactjs", src: "/assets/reactjs.png" },
  { name: "Redis", src: "/assets/redis.png" },
];

const iconSelector = document.getElementById("icon-selector");
const badgeSelector = document.getElementById("badge-selector");
const imageUpload = document.getElementById("image-upload");

// Populate icon dropdown
iconOptions.forEach((opt) => {
  const option = document.createElement("option");
  option.value = opt.src;
  option.textContent = opt.name;
  iconSelector.appendChild(option);
});

// Utility to replace badge image completely (in an attempt to fix some shadow issues on safari)
function replaceBadgeImage(badgeId, newSrc) {
  const oldImg = document.getElementById(`badge-${badgeId}`);
  if (!oldImg) return;

  const wrapper = oldImg.parentElement;

  const newImg = document.createElement("img");
  newImg.src = newSrc;
  newImg.className = "badge";
  newImg.id = `badge-${badgeId}`;
  newImg.alt = `badge ${badgeId}`;

  wrapper.replaceChild(newImg, oldImg);
}

iconSelector.addEventListener("change", () => {
  const badgeId = badgeSelector.value;
  const newSrc = iconSelector.value;
  replaceBadgeImage(badgeId, newSrc);
});

imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const badgeId = badgeSelector.value;
    const newSrc = event.target.result;
    replaceBadgeImage(badgeId, newSrc);
  };
  reader.readAsDataURL(file);

  // Clear dropdown selection
  iconSelector.selectedIndex = -1;
});

document.getElementById("download-btn").addEventListener("click", () => {
  const node = document.querySelector(".img-container");

  domtoimage
    .toPng(node)
    .then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = "gary-badges.png";
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.error("Render failed:", error);
    });
});
