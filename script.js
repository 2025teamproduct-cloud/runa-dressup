const genres = document.querySelectorAll(".genre");
const grid = document.getElementById("itemGrid");
const resultImg = document.getElementById("resultImage");
const resultArea = document.getElementById("result");
const loadBtn = document.getElementById("loadFolder");
const bgReloadBtn = document.getElementById("bgReload");

/* ===== 背景画像 ===== */
const backgrounds = [
  "img/bg1.jpg",
  "img/bg2.png",
  "img/bg3.png",
  "img/bg4.png",
  "img/bg5.png"
];

let bgIndex = 0;
resultArea.style.backgroundImage = `url(${backgrounds[bgIndex]})`;

bgReloadBtn.addEventListener("click", () => {
  bgIndex = (bgIndex + 1) % backgrounds.length;
  resultArea.style.backgroundImage = `url(${backgrounds[bgIndex]})`;
});

/* ===== ジャンル管理 ===== */
let currentGenre = "ワンピース";

const genreImages = {
  "ワンピース": [],
  "トップス": [],
  "ボトムス": [],
  "インナー": [],
  "シューズ": []
};

/* ジャンル切替 */
genres.forEach(genre => {
  genre.addEventListener("click", () => {
    genres.forEach(g => g.classList.remove("active"));
    genre.classList.add("active");

    currentGenre = genre.textContent.trim();
    renderGrid();
  });
});

/* フォルダ読み込み（ジャンル別） */
loadBtn.addEventListener("click", async () => {
  const dirHandle = await window.showDirectoryPicker();
  const images = [];

  for await (const entry of dirHandle.values()) {
    if (
      entry.kind === "file" &&
      entry.name.match(/\.(png|jpg|jpeg|webp)$/i)
    ) {
      const file = await entry.getFile();
      const url = URL.createObjectURL(file);
      images.push(url);
    }
  }

  genreImages[currentGenre] = images;
  renderGrid();
});

/* グリッド描画 */
function renderGrid() {
  grid.innerHTML = "";

  const images = genreImages[currentGenre];
  if (!images || images.length === 0) return;

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;

    img.addEventListener("click", () => {
      resultImg.src = src;
    });

    grid.appendChild(img);
  });
}
