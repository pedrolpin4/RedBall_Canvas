import Enemy from "./Enemy";
import EnemyInterface from "./interfaces/EnemyInterface";
import PlayerInterface from "./interfaces/PlayerInterface";
import Player from "./Player";

export default class Game {
    player: PlayerInterface;
    enemies: EnemyInterface[];
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    gameInterval: NodeJS.Timer;
    difficultyLoop: NodeJS.Timer;
    screenWidth: number;
    screenHeight: number;

    constructor ( screenWidth: number, screenHeight: number,
        canvas: HTMLCanvasElement,
    ){

        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
        this.canvas = canvas;
        this.player;
        this.enemies;
        this.context;
        this.configPlayers();
        this.configCanvas()
    }

    configPlayers() {
        this.player = new Player(this.screenWidth/2, this.screenHeight/2, 30, "#FF2B20");
        this.enemies = [new Enemy(10, 10, 10, "#02FF09", 3.5, 3.5)]
    }

    configCanvas() {
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.screenWidth;
        this.canvas.height = this.screenHeight;
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
                this.enemies = [];
                window.location.reload();
            }    
        })
    }

    increaseDifficulty() {
        this.enemies.push(new Enemy(1, 1, 10, "#02FF09", 3.5, 3.5))
        this.player.increaseSize();
    }

    gameLoop() {
        this.clearScreen();
        this.enemies.forEach((enemy) => {
            enemy.moveSpeed();
            enemy.draw(enemy.x, enemy.y, enemy.radius, enemy.color, this.context);
            enemy.checkOutOfScreen(this.screenWidth, this.screenHeight);
        })
        this.player.draw(this.player.x, this.player.y, this.player.radius, this.player.color, this.context);
        this.verifyColision();
    }

    start() {
        this.gameInterval = setInterval(() => {
            this.gameLoop();
        }, 1000/120);

        this.difficultyLoop = setInterval(() => {
            this.increaseDifficulty()
        }, 3000)
    }
}