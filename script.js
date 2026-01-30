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

/* 画像リスト */
const genreImages = {
  "ワンピース": ["one-piece.png"],
  "トップス": [
    "tops1.png","tops2.png","tops3.png","tops4.png",
    "tops5.png","tops6.png","tops7.png","tops8.png",
    "tops9.png","tops10.png","tops11.png","tops12.png",
    "tops13.png","tops14.png","tops15.png","tops16.png",
    "tops17.png","tops18.png","tops19.png"
  ],
  "ボトムス": ["bottoms.png"],
  "シューズ": ["shoes.png"],
  "髪型": ["hair.png"],
  "目": ["eye.png"],
  "その他": ["other.png"]
};

/* =========================
   表示制御用インデックス
========================= */
const VISIBLE_COUNT = 16;   // 常に表示する枚数
const SLIDE_COUNT = 4;     // 1回で送る枚数
let startIndex = 0;

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
   パレット描画（スライド方式）
========================= */
function renderGrid() {
  grid.innerHTML = "";

  const files = genreImages[currentGenre];
  const folder = genreMap[currentGenre];
  if (!files || !folder) return;

  const visibleFiles = files.slice(
    startIndex,
    startIndex + VISIBLE_COUNT
  );

  visibleFiles.forEach(file => {
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
   画像ボタン押下時の挙動
   ・先頭4枚を消す
   ・残りを上に詰める
   ・次の4枚を下に追加
========================= */
paletteScrollBtn.addEventListener("click", () => {
  const files = genreImages[currentGenre];
  if (!files) return;

  // 次に4枚送れるかチェック
  if (startIndex + VISIBLE_COUNT >= files.length) return;

  startIndex += SLIDE_COUNT;
  renderGrid();
});

/* =========================
   初期表示
========================= */
renderGrid();
