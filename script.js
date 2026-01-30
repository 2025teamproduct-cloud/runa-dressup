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

/* 表示名 → フォルダ名 */
const genreMap = {
  "ワンピース": "one-piece",
  "トップス": "tops",
  "ボトムス": "bottoms",
  "シューズ": "shoes",
  "髪型": "hair",
  "目": "eye",
  "その他": "other"
};

/* フォルダ名と同一の画像名 */
const genreImages = {
  "ワンピース": ["one-piece.png"],
  "トップス": ["tops.png"],
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
    grid.scrollTop = 0;
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

  files.forEach(file => {
    const img = document.createElement("img");
    img.src = `${folder}/${file}`;
    img.alt = "";

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
   ※ 現状は1枚のみでも破綻しない
========================= */
paletteScrollBtn.addEventListener("click", () => {
  const items = grid.querySelectorAll("img");
  if (items.length < 5) return;

  const firstRowTop = items[0].offsetTop;
  const secondRowTop = items[4].offsetTop;
  const scrollAmount = secondRowTop - firstRowTop;

  grid.scrollBy({
    top: scrollAmount,
    behavior: "smooth"
  });
});

/* =========================
   初期表示
========================= */
renderGrid();
