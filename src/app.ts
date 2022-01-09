import Game from "./Game";

const canvas: HTMLCanvasElement = document.querySelector('#canvas');

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight; 

const game = new Game(screenWidth, screenHeight, canvas);

canvas.addEventListener('mousemove', (event) => {
    game.movePlayer(event)
})

game.start();