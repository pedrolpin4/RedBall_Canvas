import Circle from "./Circle";
import CircleInterface from "./interfaces/CircleInterface";

export default class Player extends Circle {
    circle: CircleInterface;

    constructor(x: number, y: number, radius: number, color: string) {
        super(x, y, radius, color);
    }

    increaseSize() {
        this.radius += 2;
    }

    decreaseSize() {
        this.radius -= 5;
    }
}