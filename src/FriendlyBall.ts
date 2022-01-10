import Circle from "./Circle";

export default class FriendlyBall extends Circle{
    speedX: number;
    speedY: number;

    constructor(x: number, y: number, radius: number, color: string, speedX: number, speedY: number) {
        super(x, y, radius, color)
        this.speedX = speedX;
        this.speedY = speedY;
    }

    moveSpeed() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    checkOutOfScreen(width: number, height: number) {
        if (this.x > width || this.x < 0) {
            this.x = -50;
        }
        if (this.y > height || this.y < 0) {
            this.y = -50;
        }
    }
}