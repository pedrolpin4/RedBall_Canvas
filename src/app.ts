import Enemy from "./Enemy";
import Player from "./Player";

const canvas: HTMLCanvasElement = document.querySelector("#canvas");
let gameInterval: NodeJS.Timeout;
const context: CanvasRenderingContext2D = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas.width/2, canvas.height/2, 30, "#FF2B20");

const enemy = new Enemy(10, 10, 10, "#02FF09", 3.5, 3.5);

canvas.addEventListener("mousemove", (e) => player.move(e))

const clearScreen = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

const verifyColision = () => {
	const distance = Math.sqrt(Math.pow(player.x - enemy.x, 2) + Math.pow(player.y - enemy.y, 2));
    if (distance <= (player.radius + enemy.radius)) {
        alert('Oh, fuck off!')
        clearScreen();
        clearInterval(gameInterval)
    }
}

const gameLoop = () => {
	clearScreen();
    enemy.moveSpeed();
    enemy.draw();
	player.draw();
    enemy.checkOutOfScreen();
    verifyColision();
}

gameInterval = setInterval(() => gameLoop(), 1000/120)