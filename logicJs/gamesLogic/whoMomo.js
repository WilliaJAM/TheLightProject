const questionContainer = document.getElementById("questionContainer");
const quetionContent = document.getElementById("quetionContent");
const answer = document.getElementById("answer");

try {
    fetch("../gamesLogic/whoMomasos.json")
    .then((response) => response.json())
    .then((data)=>{
        console.log(data);
    })
} catch (error) {
    console.error(error)
}
