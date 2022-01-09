import Enemy from "./Enemy";
import CircleInterface from "./interfaces/CircleInterface";
import EnemyInterface from "./interfaces/EnemyInterface";
import Player from "./Player";

export default class Game {
    player: CircleInterface;
    enemies: EnemyInterface[];
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    gameInterval: NodeJS.Timer;
    screenWidth: number;
    screenHeight: number;

    constructor ( screenWidth: number, screenHeight: number,
        canvas: HTMLCanvasElement,
    ){
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.gameInterval = setInterval(() => this.gameLoop(), 1000/120)
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    movePlayer (event: MouseEvent) {
        this.player.x = event.clientX;
        this.player.y = event.clientY;
    }

    verifyColision() {
        this.enemies.forEach((enemy) => {
            const distance = Math.sqrt(Math.pow(this.player.x - enemy.x, 2) + Math.pow(this.player.y - enemy.y, 2));
            if (distance <= (this.player.radius + enemy.radius)) {
                alert('Oh, fuck off!')
                this.clearScreen();
                clearInterval(this.gameInterval)
            }    
        })
    }

    gameLoop() {
        this.clearScreen();
        this.player.draw();
        this.enemies.forEach((enemy) => {
            enemy.moveSpeed();
            enemy.draw();
            enemy.checkOutOfScreen();
        })
        this.verifyColision();
    }

    start() {
        this.player = new Player(this.canvas.width/2, this.canvas.height/2, 30, "#FF2B20");
        this.enemies.push(new Enemy(10, 10, 10, "#02FF09", 3.5, 3.5));
        this.player.draw();
        this.enemies[0].draw();
    }
}