/* =========================
   要素取得
========================= */
const genres = document.querySelectorAll(".genre");
const grid = document.getElementById("itemGrid");
const bgReloadBtn = document.getElementById("bgReload");
const resultCanvas = document.getElementById("resultCanvas");
const paletteScrollBtn = document.getElementById("paletteScrollBtn");

/* =========================
   背景管理
========================= */
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

/* =========================
   ジャンル管理
========================= */
let currentGenre = "ワンピース";

const genreMap = {
  "ワンピース": "one-piece",
  "トップス": "tops",
  "ボトムス": "bottoms",
  "シューズ": "shoes",
  "髪型": "hair",
  "目": "eye",
  "その他": "other"
};

const genreImages = {
  "ワンピース": ["1.png", "2.png"],
  "トップス": ["1.png", "2.png"],
  "ボトムス": ["1.png"],
  "シューズ": ["1.png"],
  "髪型": ["1.png"],
  "目": ["1.png"],
  "その他": ["1.png"]
};

/* =========================
   ジャンル切替
========================= */
genres.forEach(genre => {
  genre.addEventListener("click", () => {
    genres.forEach(g => g.classList.remove("active"));
    genre.classList.add("active");

    currentGenre = genre.textContent.trim();
    grid.scrollTop = 0; // ジャンル切替時は先頭へ
    renderGrid();
  });
});

/* =========================
   パレット描画
========================= */
function renderGrid() {
  grid.innerHTML = "";

  const files = genreImages[currentGenre];
  if (!files) return;

  const folder = genreMap[currentGenre];

  files.forEach(file => {
    const img = document.createElement("img");
    img.src = `${folder}/${file}`;

    img.addEventListener("click", () => {
      applyLayer(img.src, currentGenre);
    });

    grid.appendChild(img);
  });
}

/* =========================
   レイヤー反映
========================= */
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

/* =========================
   パレットを「1列（4枚）」ずつ下へ送る
   4×4表示を基準
========================= */
paletteScrollBtn.addEventListener("click", () => {
  const firstItem = grid.querySelector("img");
  if (!firstItem) return;

  const itemHeight = firstItem.offsetHeight;
  const gap = 10; // CSSのgrid gap
  const scrollAmount = itemHeight + gap;

  grid.scrollBy({
    top: scrollAmount,
    behavior: "smooth"
  });
});

/* =========================
   初期表示
========================= */
renderGrid();
