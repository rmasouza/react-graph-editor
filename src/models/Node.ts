import Position from './Position'
export default class Node {
    readonly id: number;

    constructor(public position: Position) {
        this.id = Date.now()
    }
}