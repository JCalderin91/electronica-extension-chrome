const tag = document.getElementById("tag");
const svg = document.getElementById("svg");
const quantity = document.querySelector("#quantity input");

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

  let dollarAmount = Number(dollar.replaceAll(" ", "").replaceAll(",", "."));

  dollarAmount *= Number(quantity.value) || 1;

  setTimeout(() => {
    tag.innerHTML = `${dollarAmount.toFixed(3)} Bs.`;
    svg.classList.remove("loading");
  }, 500);
};

updateInterface();

const refreshBtn = document.getElementById("refresh-btn");

refreshBtn.addEventListener("click", () => {
  updateInterface();
});

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

quantity.addEventListener(
  "input",
  debounce(() => {
    updateInterface();
  }, 2000)
);
