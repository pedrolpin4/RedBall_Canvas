import Enemy from "./Enemy";
import FriendlyBall from "./FriendlyBall";
import EnemyInterface from "./interfaces/EnemyInterface";
import PlayerInterface from "./interfaces/PlayerInterface";
import Player from "./Player";

export default class Game {
    player: PlayerInterface;
    enemies: EnemyInterface[];
    friends: EnemyInterface[];
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    gameInterval: NodeJS.Timer;
    difficultyLoop: NodeJS.Timer;
    score: number;
    scoreInterval: NodeJS.Timer;
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
        this.friends;
        this.context;
        this.score;
        this.scoreLoop;
        this.configPlayers();
        this.configCanvas()
    }

    configPlayers() {
        this.score = 0;
        this.player = new Player(this.screenWidth/2, this.screenHeight/2, 30, "#FF0000");
        this.enemies = [new Enemy(10, 10, 10, "#00FF00", 3.5, 3.5)]
        this.friends = [];
    }

    scoreLoop() {
        this.score++
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
                alert(`Your score is ${this.score}`)
                this.clearScreen();
                this.score = 0;
                clearInterval(this.gameInterval)
                clearInterval(this.scoreInterval)
                clearInterval(this.difficultyLoop)
                this.enemies = [];
                window.location.reload();
            }    
        })
    }

    verifyFriendlyColision() {
        this.friends.forEach((friend) => {
            const distance = Math.sqrt(Math.pow(this.player.x - friend.x, 2) + Math.pow(this.player.y - friend.y, 2));
            if (distance <= (this.player.radius + friend.radius)) {
                this.score += 10;
                friend.x = -50;
                friend.y = -50;
                this.player.decreaseSize();
            }    
        })
    }

    increaseDifficulty() {
        const yellowSpawn = Math.random()- 0.05 < 0.2; 
        const position = Math.round(Math.random() * this.screenHeight);
        const randomSide = Math.random() > 0.5

        if(yellowSpawn) {
            this.friends.push(new FriendlyBall(randomSide ? 1 : this.screenWidth - 1, position, 20, "#FAED27", randomSide ? 5 : -5, randomSide ? 5 : -5));
            return;
        }

        const blueSpawn = (Math.random() - 0.05 < 0.1);
        
        if(blueSpawn) {
            this.enemies.push(new Enemy(randomSide ? 1 : this.screenWidth - 1, position, 25, "#0000FF", 7, 7))
            return;
        }
        
        const speed = Math.round(Math.random() * 4) + 2
        this.enemies.push(new Enemy(randomSide ? 1 : this.screenWidth - 1, position, 10, "#00FF00" , speed,  speed))
        this.player.increaseSize();
    }

    gameLoop() {
        this.clearScreen();
        this.player.draw(this.player.x, this.player.y, this.player.radius, this.player.color, this.context);
        this.enemies.forEach((enemy) => {
            enemy.moveSpeed();
            enemy.draw(enemy.x, enemy.y, enemy.radius, enemy.color, this.context);
            enemy.checkOutOfScreen(this.screenWidth, this.screenHeight);
        });
        this.verifyColision();
        this.friends.forEach((friend) => {
            friend.moveSpeed();
            friend.draw(friend.x, friend.y, friend.radius, friend.color, this.context);
            friend.checkOutOfScreen(this.screenWidth, this.screenHeight);
        });
        this.verifyFriendlyColision();
    }

    start() {
        this.gameInterval = setInterval(() => {
            this.gameLoop();
        }, 1000/120);

        this.difficultyLoop = setInterval(() => {
            this.increaseDifficulty()
        }, 3000)

        this.scoreInterval = setInterval(() => {
            this.scoreLoop();
        }, 1000)
    }
}