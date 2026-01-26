const baseList = document.getElementById("baseList");
const itemList = document.getElementById("itemList");

const previewBase = document.getElementById("previewBase");
const previewItem = document.getElementById("previewItem");

const STORAGE_KEY = "dressup-data";

/* 初期化 */
loadFromStorage();

/* 素体アップロード */
document.getElementById("baseUpload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  readImage(file, data => {
    addThumbnail(baseList, data, "base");
    saveToStorage();
  });
});

/* 着せ替えアップロード */
document.getElementById("itemUpload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  readImage(file, data => {
    addThumbnail(itemList, data, "item");
    saveToStorage();
  });
});

/* サムネイル生成 */
function addThumbnail(container, src, type) {
  const div = document.createElement("div");
  div.className = "item";

  const img = document.createElement("img");
  img.src = src;

  img.addEventListener("click", () => {
    if (type === "base") previewBase.src = src;
    if (type === "item") previewItem.src = src;
  });

  const del = document.createElement("div");
  del.className = "delete";
  del.textContent = "×";

  del.addEventListener("click", e => {
    e.stopPropagation();
    div.remove();
    saveToStorage();

    if (previewBase.src === src) previewBase.src = "";
    if (previewItem.src === src) previewItem.src = "";
  });

  div.appendChild(img);
  div.appendChild(del);
  container.appendChild(div);
}

/* 画像読み込み（Base64化） */
function readImage(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

/* 保存 */
function saveToStorage() {
  const data = {
    bases: collectImages(baseList),
    items: collectImages(itemList)
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* 復元 */
function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  const data = JSON.parse(raw);
  data.bases.forEach(src => addThumbnail(baseList, src, "base"));
  data.items.forEach(src => addThumbnail(itemList, src, "item"));
}

/* 画像一覧取得 */
function collectImages(container) {
  return Array.from(container.querySelectorAll("img")).map(img => img.src);
}
