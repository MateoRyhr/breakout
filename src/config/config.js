//seetings
let winner = false;
let level = 1;
let score = ui.score

function plusLevel(){
    level++
}

let speed = 10; // 17 == 58 fps

//sounds
let sound = true

//render
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// let score = parseInt(document.getElementById("score").textContent);
// const playButton = document.getElementById("play")
// const tactilControls = document.getElementById('tactilControls')

//bloques
let blockColor = "#00d2d3";

//objects
let ball = new objects.Ball(200, 565, 20, 20, "red");
let blockPlayer = new objects.Block(150, 575, 100, 200, "blue");
let block = new Array();
let rightWall = new objects.Block(canvas.width, 0, 0, canvas.height);
let upWall = new objects.Block(0, 0, canvas.width, 0);
let leftWall = new objects.Block(0, 0, 0, canvas.height);

export {
    //settings
    winner,
    level,
    speed,
    score,
    //render
    canvas,
    ctx,
    //sounds
    sound,
    //ui
    ui,
    //graphs
    blockColor,
    //objects
    rightWall,
    upWall,
    leftWall,
    ball,
    blockPlayer,
    block,

    plusLevel
}