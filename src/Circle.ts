export default class Circle {
    x: number;
    y: number;
    radius: number;
    color: string;

    constructor (x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(x: number, y: number, radius: number, color: string, context: CanvasRenderingContext2D) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
    }
}