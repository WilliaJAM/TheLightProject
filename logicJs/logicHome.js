const title = document.getElementById("titleGame");
const ads = document.createElement("h1");
let  asda = "The Game";

let musicList = [
    "../Sound/music/Lancer - Toby Fox.mp3", 
    "../Sound/music/sans. - Toby Fox.mp3",
    "../Sound/music/Ruins - Toby Fox.mp3",
    "../Sound/music/It's Showtime.mp3"
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const music = new Audio(musicList[getRandomInt(0, musicList.length)]);
music.volume = 0.6
music.loop = true;

ads.textContent = asda
ads.style.textAlign  = "center"

title.appendChild(ads)

const games = [
    {
        "id" : 1,
        "name": "Clicker",
        "imageGame": "../assets/clickerGamePixel.png",
        "descriptionGame" : "Clickea hasta llegar a 500.000 clicks (te va llevar un tiempito)",
        "urlGame": "../views/clicker.html",
        "achievement" : {
                "imageAchievement" : "url",
                "obtained": false,
                "description" : "Se condigue al completar el mini juego Clicker",
                "nameAchievement": "Click, Click, Click."
            }
    },
    {
        "id" : 2,
        "name": "Whot that Shitpost",
        "imageGame": "../assets/pixel_art_large.png",
        "descriptionGame" : "Trata de adivinar que momo es. (Si lo adivinas todos formas parte del 0,00001% de las personas)",
        "urlGame": "../views/whoMomo.html",
        "achievement" : {
                "imageAchievement" : "url",
                "obtained": false,
                "description" : "Se condigue al completar el mini juego Whot that Shitpost",
                "nameAchievement": "El que quiera perder su tiempo que lo pierda."
            }
    },
    {
        "id" : 3,
        "name": "Osu!",
        "imageGame": "../assets/OsulogoPixel.png",
        "descriptionGame" : "Clickea donde te señalen",
        "urlGame": "../views/osuGame.html",
        "achievement" : {
                "imageAchievement" : "url",
                "obtained": false,
                "description" : "Se condigue al completar el mini juego Osu!",
                "nameAchievement": "Solo los que no tienen novia consiguen esto."
            }
    },
]

    localStorage.setItem("game", JSON.stringify(games))

//Evita que se sobre escriba el localeStorage
if(!localStorage.getItem("game")){
    localStorage.setItem("game", JSON.stringify(games))
}
const getDataBase = JSON.parse(localStorage.getItem("game")); 



const idDivContainer = document.getElementById("gameShow")

const nextGame = document.getElementById("nextGame");
const previousGame = document.getElementById("previousGame")



let number = 0
let id ;

let findElement = (array, id)=>{
    return array.find(el => el.id == id)
}

function selectorGame(array ,index) {
idDivContainer.textContent = " ";

const game =  findElement(array , index);

const divCardContainer = document.createElement("div");
const imgCardContainer = document.createElement("img");
const divCardBody = document.createElement("div");
const textCard = document.createElement("p")

divCardContainer.style.width = "500px";
divCardContainer.style.height = "500px";
divCardContainer.style.padding = "20px"
divCardContainer.style.border = "none";
divCardContainer.style.boxShadow = "5px 5px 15px";
divCardBody.style.padding = "10px";
divCardBody.style.textAlign = "center";

imgCardContainer.src = `${game.imageGame}`;
imgCardContainer.style.textAlign = "center";
imgCardContainer.style.width = "350px";
imgCardContainer.style.display = "block";
imgCardContainer.style.margin = "0 auto";
id = game.id

textCard.textContent = `${game.descriptionGame}`;

divCardContainer.appendChild(imgCardContainer);
divCardBody.appendChild(textCard);
divCardContainer.appendChild(divCardBody);
idDivContainer.appendChild(divCardContainer);
}

let buttonNext = document.createElement("img");
let buttonPrevious = document.createElement("img");

//Boton que avanza la lista de juegos
buttonNext.src = "../assets/flecha-derecha.png";
buttonNext.style.width = "100px"
buttonNext.style.height = "100px"
buttonNext.style.cursor = "pointer"

const effect = new Audio("../Sound/effects/buttonsNextEffect (mp3cut.net).mp3");

//Boton siguiente
buttonNext.addEventListener('click', ()=>{
    if(number === getDataBase.length){
        number = 1
    }else{
        number += 1
    }
    selectorGame(getDataBase ,number)
    console.log(number);
    effect.play();
})

//Boton que retrocede la lista de juegos
buttonPrevious.src = "../assets/flecha-izquierda.png";
buttonPrevious.style.width = "100px"
buttonPrevious.style.height = "100px"
buttonPrevious.style.cursor = "pointer"



//Boton atras
buttonPrevious.addEventListener('click', ()=>{
    effect.play();
    if(number === 1){
        number = getDataBase.length
    }else{
        number -= 1
    }
selectorGame(getDataBase , number)
    console.log(number);
})
nextGame.appendChild(buttonNext);
previousGame.appendChild(buttonPrevious);

const buttonPlay = document.getElementById("buttonPlay");

let button = document.createElement("button");
button.textContent = "Play"
button.style.width = "300px"
button.style.height = "100px"
button.style.fontSize = "45px"

function openGame(index) {
    window.open(`${findElement(getDataBase, index).urlGame}`, "_self");
}

const selectedGameEffect = new Audio("../Sound/effects/selectedGame.mp3")
selectedGameEffect.volume = 0.6
button.addEventListener("click", ()=>{
    selectedGameEffect.play();

    setTimeout(()=>{
        openGame(id);
    }, 1300)
});

buttonPlay.appendChild(button)

const musicButton = document.getElementById("music");

const buttonPlayMusic = document.createElement("img");
buttonPlayMusic.src = "../assets/musicOn.png"
buttonPlayMusic.style.width = "70px"
buttonPlayMusic.style.height = "70px"
buttonPlayMusic.style.position = "relative"
buttonPlayMusic.style.top = "20px"
buttonPlayMusic.style.cursor = "pointer"
buttonPlayMusic.style.left = "95%"
buttonPlayMusic.alt = "Poner musica"

let isMusicListen = true;

buttonPlayMusic.addEventListener("click", ()=>{
    if(isMusicListen === true){
        music.play()
        isMusicListen = false
    }else{
        isMusicListen = true
        music.pause()
    }
    buttonPlayMusic.src = isMusicListen ? "../assets/musicOff.png" : "../assets/musicOn.png"
    console.log(isMusicListen);
})

musicButton.appendChild(buttonPlayMusic);

(()=>{
    music.play();
    number += 1
    selectorGame(getDataBase , number);
})();

//Tratar de corregir bug que aveces se escucha el audio y cuando se cliequea
