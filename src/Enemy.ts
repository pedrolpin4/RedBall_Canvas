import Circle from "./Circle";

export default class Enemy extends Circle{
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

    checkOutOfScreen() {
        if (this.x > window.innerWidth || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
    }
}