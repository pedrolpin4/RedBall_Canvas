import CircleInterface from "./CircleInterface";

export default interface EnemyInterface extends CircleInterface{
    speedX: number,
    speedY: number,
    moveSpeed: Function,
    checkOutOfScreen: Function,
};
