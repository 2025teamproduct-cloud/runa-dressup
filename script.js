const genres = document.querySelectorAll(".genre");
const grid = document.getElementById("itemGrid");
const resultImg = document.getElementById("resultImage");
const resultArea = document.getElementById("result");

/* ジャンル切替 */
genres.forEach(g => {
  g.addEventListener("click", () => {
    genres.forEach(x => x.classList.remove("active"));
    g.classList.add("active");
  });
});

/* フォルダ読み込み（素材） */
document.getElementById("loadFolder").addEventListener("click", async () => {
  grid.innerHTML = "";

  const dirHandle = await window.showDirectoryPicker();

  for await (const entry of dirHandle.values()) {
    if (entry.kind === "file" && entry.name.match(/\.(png|jpg|jpeg|webp)$/)) {
      const file = await entry.getFile();
      const url = URL.createObjectURL(file);

      const img = document.createElement("img");
      img.src = url;
      img.addEventListener("click", () => {
        resultImg.src = url;
      });

      grid.appendChild(img);
    }
  }
});

/* ===== 背景切り替え ===== */

const backgrounds = [
  "img/bg1.jpg",
  "img/bg2.png",
  "img/bg3.png",
  "img/bg4.png",
  "img/bg5.png"
];

let bgIndex = 0;
resultArea.style.backgroundImage = `url(${backgrounds[0]})`;

document.getElementById("bgReload").addEventListener("click", () => {
  bgIndex = (bgIndex + 1) % backgrounds.length;
  resultArea.style.backgroundImage = `url(${backgrounds[bgIndex]})`;
});
