let body = document.getElementsByTagName("body")[0];
const dollarPrice = 24.2;
let amounts = [
  ...body.innerHTML.matchAll(
    /Bs\. &nbsp;((\d)*)+([\.]\d{1,3})*(([\,]\d{1,2})?)/g
  ),
].map((price) => {
  return price[0].slice(10, price[0].length);
});

let newBody = body.innerHTML;
let dollar;

const amountsSet = new Set(amounts);

amounts = [...amountsSet];

amounts.forEach((amount) => {
  dollar = (
    Number(amount.replaceAll(".", "").replace(",", ".")) / dollarPrice
  ).toFixed(2);
  newBody = newBody.replaceAll(
    amount,
    `${amount} <span class='dollar-amount'>$ ${dollar}</span>`
  );
});

body.innerHTML = newBody;

const upButton = document.createElement("button");

upButton.innerText = "▲";

upButton.classList.add("btn-up");

upButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.body.appendChild(upButton);
