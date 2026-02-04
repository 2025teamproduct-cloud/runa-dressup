/* =========================
   要素取得
========================= */
const genres = document.querySelectorAll(".genre");
const grid = document.getElementById("itemGrid");
const bgReloadBtn = document.getElementById("bgReload");
const resultCanvas = document.getElementById("resultCanvas");
const paletteScrollBtn = document.getElementById("paletteScrollBtn");
const paletteScrollUpBtn = document.getElementById("paletteScrollUpBtn");
const undoBtn = document.getElementById("undoBtn");

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
  "ワンピース": [
    "one-piece_1.png",
    "one-piece_2.png",
    "one-piece_3.png",
    "one-piece_4.png",
    "one-piece_5.png",
  ],
  "トップス": [
    "tops_1.png",
    "tops_2.png",
    "tops_3.png",
  ],
  "ボトムス": [
    "bottoms_1.png",
    "bottoms_2.png",
  ],
  "シューズ": [
    "shoes_1.png",
    "shoes_2.png",
    "shoes_3.png",
    "shoes_4.png",
  ],
  "髪型": [
    "hair_1.png",
    "hair_2.png",
    "hair_3.png",
    "hair_4.png",
    "hair_5.png",
    "hair_6.png",
    "hair_7.png",
    "hair_8.png",
    "hair_9.png",
    "hair_10.png",
    "hair_11.png",
    "hair_12.png",
    "hair_13.png",
    "hair_14.png",
    "hair_15.png",
  ],
  "目": [
    "eye_1.png",
    "eye_2.png",
    "eye_3.png",
    "eye_4.png",
    "eye_5.png",
    "eye_6.png",
    "eye_7.png",
  ],
  "その他": [
    "other_1.png",
    "other_2.png",
    "other_3.png",
  ]
};


/* =========================
   表示制御
========================= */
const VISIBLE_COUNT = 12;
const SLIDE_COUNT = 4;
let startIndex = 0;

/* =========================
   Undo 管理
========================= */
let historyStack = [];

/* =========================
   ジャンル切替
========================= */
genres.forEach(genre => {
  genre.addEventListener("click", () => {
    genres.forEach(g => g.classList.remove("active"));
    genre.classList.add("active");

    currentGenre = genre.textContent.trim();
    startIndex = 0;
    renderGrid();
  });
});

/* =========================
   パレット描画
========================= */
function renderGrid() {
  grid.innerHTML = "";

  const files = genreImages[currentGenre];
  const folder = genreMap[currentGenre];
  if (!files || !folder) return;

  files
    .slice(startIndex, startIndex + VISIBLE_COUNT)
    .forEach(file => {
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
  const existing = resultCanvas.querySelectorAll('img[data-genre]');

  historyStack.push(
    Array.from(existing).map(img => ({
      genre: img.dataset.genre,
      src: img.src
    }))
  );

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
   Undo
========================= */
undoBtn.addEventListener("click", () => {
  if (historyStack.length === 0) return;

  const lastState = historyStack.pop();

  resultCanvas
    .querySelectorAll('img[data-genre]')
    .forEach(img => img.remove());

  lastState.forEach(item => {
    const img = document.createElement("img");
    img.dataset.genre = item.genre;
    img.src = item.src;
    resultCanvas.appendChild(img);
  });
});

/* =========================
   スクロール
========================= */
paletteScrollBtn.addEventListener("click", () => {
  const files = genreImages[currentGenre];
  if (startIndex + VISIBLE_COUNT >= files.length) return;

  startIndex += SLIDE_COUNT;
  renderGrid();
});

paletteScrollUpBtn.addEventListener("click", () => {
  if (startIndex === 0) return;

  startIndex = Math.max(0, startIndex - SLIDE_COUNT);
  renderGrid();
});

/* =========================
   パーティクル
========================= */
document.addEventListener("click", e => {
  if (!e.target.closest(".grid img")) return;

  for (let i = 0; i < 8; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 20;

    p.style.left = `${e.clientX}px`;
    p.style.top = `${e.clientY}px`;
    p.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    p.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }
});

/* =========================
   初期表示
========================= */
renderGrid();
