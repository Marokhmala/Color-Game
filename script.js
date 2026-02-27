//variables

let score=0;
let currentDifficulty = "easy";
let targetColor = "";
let colors = [];
let isRgbMode = true;

const difficultySettings = {
    easy: {boxes:3,correct:10,wrong:-5},
    medium: {boxes:6,correct:20,wrong:-10},
    hard: {boxes:9,correct:30,wrong:-15}
}

//elements

const boxes = document.querySelectorAll(".main-box");
const scoreText = document.getElementById("score");
const colorWheelText = document.getElementById("color-wheel");

const easyBtn = document.getElementById("easy-btn");
const mediumBtn = document.getElementById("medium-btn");
const hardBtn = document.getElementById("hard-btn");

const resetBtn = document.getElementById("reset-btn");
const swapBtn = document.getElementById("swap-btn");

//color generation

function generateRandomColor() {
  if (isRgbMode) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  }
}

//new round

function startNewRound(){
    colors=[];

    const activeBoxesCount = difficultySettings[currentDifficulty].boxes;

    boxes.forEach((box)=>{
        box.style.backgroundColor = "";
        box.style.display = "block";
        box.style.opacity = "1";
        box.style.pointerEvents = "none";  //es ras shoba ver gavige
    });

    for(let i=0; i<activeBoxesCount; i++){
        const color = generateRandomColor();
        colors.push(color);
        boxes[i].style.backgroundColor = color;
        boxes[i].style.pointerEvents = "auto";  
    }

    const randomIndex = Math.floor(Math.random() * activeBoxesCount);
    targetColor = colors[randomIndex];

    colorWheelText.textContent = `Guess color: ${targetColor}`;
    
}

//score

function updateScore(){
    scoreText.textContent = `Score: ${score}`;
}

//box click logic

boxes.forEach((box)=>{
    box.addEventListener("click",function(){
        const clickedColor=box.style.backgroundColor;

        if(clickedColor === targetColor){
            score += difficultySettings[currentDifficulty].correct;
            updateScore();
            startNewRound();
        } else {
            score += difficultySettings[currentDifficulty].wrong;
            updateScore();
            box.style.opacity = "0.5";
            box.style.pointerEvents = "none"; 
        }
    });
});

//difficulty buttons

easyBtn.addEventListener("click", function () {
  currentDifficulty = "easy";
  startNewRound();
});

mediumBtn.addEventListener("click", function () {
  currentDifficulty = "medium";
  startNewRound();
});

hardBtn.addEventListener("click", function () {
  currentDifficulty = "hard";
  startNewRound();
});

//reset btn

resetBtn.addEventListener("click", function () {
  score = 0;
  updateScore();
  startNewRound();
});

//swap btn

swapBtn.addEventListener("click", function () {
  isRgbMode = !isRgbMode;
  startNewRound();
});




updateScore();
startNewRound();