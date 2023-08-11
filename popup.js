const tag = document.getElementById("tag");
const svg = document.getElementById("svg");

const getDollar = () =>
  fetch("https://www.bcv.org.ve/")
    .then((res) => res.text())
    .then((html) => {
      var page = new DOMParser().parseFromString(html, "text/html");
      const dollar = page.querySelector("#dolar .centrado").innerText;
      return dollar;
    });

const updateInterface = async () => {
  tag.innerHTML = "Consulting";
  svg.classList.add("loading");
  const dollar = await getDollar();
  setTimeout(() => {
    svg.classList.remove("loading");
  }, 1000);

  tag.innerHTML = `BCV: ${Number(
    dollar.replaceAll(" ", "").replaceAll(",", ".")
  ).toFixed(3)}`;
};

updateInterface();

const refreshBtn = document.getElementById("refresh-btn");

refreshBtn.addEventListener("click", () => {
  updateInterface();
});
