const genres = document.querySelectorAll(".genre");
const grid = document.getElementById("itemGrid");
const bgReloadBtn = document.getElementById("bgReload");
const resultCanvas = document.getElementById("resultCanvas");

/* ===== 背景 ===== */
const backgrounds = [
  "img/bg1.jpg",
  "img/bg2.png",
  "img/bg3.png",
  "img/bg4.png",
  "img/bg5.png"
];

let bgIndex = 0;
resultCanvas.style.backgroundImage = `url(${backgrounds[bgIndex]})`;

bgReloadBtn.addEventListener("click", () => {
  bgIndex = (bgIndex + 1) % backgrounds.length;
  resultCanvas.style.backgroundImage = `url(${backgrounds[bgIndex]})`;
});

/* ===== ジャンル定義 ===== */
let currentGenre = "ワンピース";

/* フォルダと画像定義 */
const genreImages = {
  "ワンピース": [
    "one-piece/1.png",
    "one-piece/2.png"
  ],
  "トップス": [
    "tops/1.png",
    "tops/2.png"
  ],
  "ボトムス": [
    "bottoms/1.png"
  ],
  "インナー": [
    "inner/1.png"
  ],
  "シューズ": [
    "shoes/1.png"
  ],
  "ヘア": [
    "hair/1.png"
  ]
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

/* パレット描画 */
function renderGrid() {
  grid.innerHTML = "";

  const images = genreImages[currentGenre];
  if (!images) return;

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;

    img.addEventListener("click", () => {
      applyLayer(src, currentGenre);
    });

    grid.appendChild(img);
  });
}

/* レイヤー反映 */
function applyLayer(src, genre) {
  let layer = resultCanvas.querySelector(
    `img[data-genre="${genre}"]`
  );

  if (!layer) {
    layer = document.createElement("img");
    layer.dataset.genre = genre;
    resultCanvas.appendChild(layer);
  }

  layer.src = src;
}

/* 初期描画 */
renderGrid();
