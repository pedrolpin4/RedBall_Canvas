import CircleInterface from "./CircleInterface";

export default interface PlayerInterface extends CircleInterface {
    increaseSize: Function,
    decreaseSize: Function,
}