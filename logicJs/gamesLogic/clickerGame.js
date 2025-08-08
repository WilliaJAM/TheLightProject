const powerUps = [
    {
    id: 1,
    name: "+5",
    description: "Aumenta mas 5 en el contador, no es mucho pero algo es algo.",
    cost: 10,
    unLockNumber: 250,
    unLockButton: true,
    function: ()=>{
        addFiveClick()
    },
    },
    {
    id: 2,
    name: "X2 puntos",
    description: "Aumenta por 2 cada click por 5 segundos.",
    cost: 10,
    unLockNumber: 1500,
    unLockButton: true,
    function: ()=>{
        duplicateIncrement() 
    }
    },
    {
    id: 3,
    name: "XD",
    description: "Boton que hace algo en el contador.",
    cost: 10,
    unLockNumber: 2500,
    unLockButton: true,
    function: ()=>{
        functionHappy()
    }
    }
];



//Eventos del juego
function duplicateIncrement() {
    increment = 2
    setTimeout(()=>{
    increment = 1
    }, 10000)
}

function addFiveClick() {
    counterNumber = counterNumber + 5
    clickActual.textContent = `${counterNumber}`
    console.log(counterNumber);
}

function functionHappy() {
    setTimeout(()=>{
        alert(`Hola, ese contador esta muy grande`)
    clickActual.textContent = '0'

    button.addEventListener('click',()=>{
        alert('Te asuste XDxdxd')
    }, {once: true});
    }, 1500);
}


const counter = document.getElementById("counterClicks");
const buttonClicker = document.getElementById("buttonClicker");
const backToHome = document.getElementById("backToHome");

const buttonBack = document.createElement('img');
buttonBack.src = '/assets/flecha-izquierda.png';
buttonBack.id= 'backIcon'
let effect = new Audio('/Sound/effects/buttonsNextEffect (mp3cut.net).mp3')
buttonBack.addEventListener('click', ()=>{
    effect.play()
    setTimeout(()=>{
        window.open('/views/home.html', 'self_');
    }, 200)
})
backToHome.appendChild(buttonBack)



let counterNumber = 0;
let increment= 1;

const clickActual = document.createElement("p");
clickActual.textContent = `!Empieza¡`;
clickActual.id = `counter`;


const button = document.createElement("p");
button.textContent = "CLICK";
button.id = "click"
button.className = "borderButton"

//Boton que activa el modal
const titleModal = document.getElementById('labelTitleModal');
titleModal.textContent = 'Tienda'

const titleButton = document.getElementById('toggleModal');
titleButton.textContent = 'Abrir tienda'

const bodyModal = document.getElementById('bodyModal');



let divTooltip = document.getElementById("tooltip");
divTooltip.textContent = "Aqui podras comprar un power up que te ayude en esta tarea."

function mouseOverEvent(el, notifications) {
    el.addEventListener("mouseover", ()=>{
        divTooltip.textContent = "";

        divTooltip.textContent = notifications;
        
        el.addEventListener("mouseout",()=>{
            divTooltip.textContent = "Aqui podras comprar un power up que te ayude en esta tarea."
        }, {once:true});
    })
}



//Power ups / Para rederizar los botones
function buttonsPowerUps(number) {
    //Esto vacia desde aqui haciendo que cuando se ejecute desde aqui no se dupliquen
    //ademas llamo asi mismo la funcuion osea s auto invoca.
    bodyModal.textContent = ''
    powerUps.forEach(element => {
        const button = document.createElement('button');
        
        let isDisable;
        //buscar la form de hacer que se ejecute una sole vez
        isDisable = element.unLockNumber <= number ? false : true;
        
        console.log('XD' , isDisable);
        button.textContent = element.name;
        button.disabled = isDisable

        mouseOverEvent(button, element.description)

        button.addEventListener('click', ()=>{
            if(element.cost <= counterNumber){
                counterNumber = counterNumber- element.cost
                clickActual.textContent = counterNumber
                element.function()
                //Cuando lo invoco desde aqui el siempre haria la funcionalidad de que este
                //constantemente observando osea si la condicionde un boton se cuple desde aqui se ejecutara
                //y si lo hago de la parte principal lo mismo.
                buttonsPowerUps(counterNumber)
            }else{
                alert('No hay suficientes clicks para gastar');
            }
    })
    bodyModal.appendChild(button)
    //Hacer un tooltip desde cero mostrando la decripción del boton
});
}

let limit = 20;

//Funcion incrementa el contador
function incrementCounterFunction(callBack, counter, limitNumber) {
    if(counter == limitNumber){
        alert(`Hola Se termino`);
        button.style.display = "none"
    }else{
        counterNumber += increment;
    clickActual.textContent = `${counterNumber}`
    /*Solo se usara para usar la función buttonsPowerUps y se pasa
    por parametro el contador*/
    callBack(counter)
    }
}
//Alamcena funciuones si se necesita
button.addEventListener('click',()=>{
    incrementCounterFunction(buttonsPowerUps, counterNumber, limit)
})

buttonClicker.appendChild(button);
counter.appendChild(clickActual);


(()=>{
    buttonsPowerUps(counterNumber)
})()

//Arreglar que cuando se cumple se haga una sola vez osea cuando cumpla con la meta click que necesita para desbloquearse
// y que no importe que si ya no cumple igual este activo osea solo se ejecute una sola vez y de hay se permanezca activo.
