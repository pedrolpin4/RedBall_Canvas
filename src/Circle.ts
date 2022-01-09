import CircleInterface from "./interfaces/CircleInterface";

export default class Circle implements CircleInterface {
    x: number;
    y: number;
    radius: number;
    color: string;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor (x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.canvas = document.querySelector("#canvas")
        this.context = this.canvas.getContext("2d")
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
    }
}