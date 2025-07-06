const counter = document.getElementById("counterClicks");
const buttonClicker = document.getElementById("buttonClicker");


let counterNumber = 0;

const clickActual = document.createElement("p");
clickActual.textContent = `!Empieza¡`;
clickActual.id = `counter`;


const button = document.createElement("p");
button.textContent = "CLICK";
button.id = "click"
button.className = "borderButton"



button.addEventListener('click',()=>{
    clickActual.textContent = `${counterNumber}`
    counterNumber += 1
    let adsa =  getRandomInt(1, 100)
    console.log(adsa);
    if (adsa == 5) {
        window.open("https://www.youtube.com/watch?v=rpScl2GKu9o", "_blank");
    }
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



buttonClicker.appendChild(button);
counter.appendChild(clickActual);