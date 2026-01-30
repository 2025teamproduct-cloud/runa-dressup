/* =========================
   要素取得
========================= */
const genres = document.querySelectorAll(".genre");
const grid = document.getElementById("itemGrid");
const bgReloadBtn = document.getElementById("bgReload");
const resultCanvas = document.getElementById("resultCanvas");

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

/*
  ジャンル名 → フォルダ名対応
  ※ フォルダはすべてプロジェクト直下
*/
const genreMap = {
  "ワンピース": "one-piece",
  "トップス": "tops",
  "ボトムス": "bottoms",
  "シューズ": "shoes",
  "髪型": "hair",
  "目": "eye",
  "その他": "other"
};

/*
  各ジャンルの画像一覧
  ※ 追加したい場合は配列にファイル名を足すだけ
*/
const genreImages = {
  "ワンピース": ["one-piece.png", "one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png","one-piece.png",],
  "トップス": ["tops.png", "2.png"],
  "ボトムス": ["bottoms.png"],
  "シューズ": ["shoes.png"],
  "髪型": ["hair.png"],
  "目": ["eye.png"],
  "その他": ["other.png"]
};

/* =========================
   ジャンル切替
========================= */
genres.forEach(genre => {
  genre.addEventListener("click", () => {
    genres.forEach(g => g.classList.remove("active"));
    genre.classList.add("active");

    currentGenre = genre.textContent.trim();
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
   初期表示
========================= */
renderGrid();
