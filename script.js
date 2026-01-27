const genres = document.querySelectorAll(".genre");
const grid = document.getElementById("itemGrid");
const result = document.getElementById("resultImage");

/* ジャンル切替 */
genres.forEach(g => {
  g.addEventListener("click", () => {
    genres.forEach(x => x.classList.remove("active"));
    g.classList.add("active");
  });
});

/* フォルダ読み込み */
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
        result.src = url;
      });

      grid.appendChild(img);
    }
  }
});
