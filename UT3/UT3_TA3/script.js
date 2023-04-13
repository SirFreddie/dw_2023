// Image URIs
const blackCarImage = 'url("https://i.postimg.cc/NGRJX8hr/black-benz.jpg")';
const redCarImage = 'url("https://i.postimg.cc/cH2pJdny/red-benz.webp"';
const grayCarImage = 'url("https://i.postimg.cc/BvyYTMQ2/gray-benz.jpg")';

const btnRed = document.querySelector(".red");
const btnGray = document.querySelector(".gray");
const btnBlack = document.querySelector(".black");

const btnAddCart = document.getElementById("button")
const btnFeedback = document.querySelector(".feedback")

let toogleFeedback = false

btnRed.addEventListener('click', () => {
  changeColor(redCarImage, "red")
});

btnGray.addEventListener('click', () => {
  changeColor(grayCarImage, "gray")
});

btnBlack.addEventListener('click', () => {
  changeColor(blackCarImage, "black")
});

btnAddCart.addEventListener('click', () => {
    toogleButtons()
});

btnFeedback.addEventListener('click', () => {
    toogleButtons()
});

function changeColor(color, tagColor) {
    const imgContainer = document.querySelector(".product-image");
    const tagContainer = document.querySelector(".tag")
    imgContainer.style.backgroundImage = color;
    tagContainer.style.backgroundColor = tagColor;
}

function toogleButtons() {
    toogleFeedback = !toogleFeedback
    btnFeedback.style.display = toogleFeedback ? "block" : "none";
    btnAddCart.style.display = toogleFeedback ? "none" : "block";
}