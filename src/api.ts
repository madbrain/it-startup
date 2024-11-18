
export enum GameMode {
    FAST = 32,
    STANDARD = 64,
    LONG = 128
}

export enum GameStatus {
    READY,
    STARTED
}

export interface Card {
    id: number;
    name: string;
}

export interface Employee {
    card: Card;
    burnout: number;
    knowledge: Card[];
}

export interface Player {
    name: string,
    resources: number;
    points: number;
    board: Employee[];
}

export interface Action {
    code: string;
    label: string;
}

export interface Game {
    id: string;
    name: string;
    turn: number,
    players: Player[];
    
    hand: Card[];
    actions: Action[];
}