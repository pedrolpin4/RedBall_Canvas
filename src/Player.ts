import Circle from "./Circle";

export default class Player extends Circle {
    constructor(x: number, y: number, radius: number, color: string) {
        super(x, y, radius, color);
    }

    move(event: MouseEvent) {
        this.x = event.clientX;
        this.y = event.clientY;
    }
}