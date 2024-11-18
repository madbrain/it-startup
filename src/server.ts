
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameMode, GameStatus, } from './api';
import { type Game } from './api';
import { Game as InternalGame, Player } from './game';

/* API */
export interface GameSummary {
    id: string;
    name: string;
    status: GameStatus;
}

export interface Client {
    subject: Observable<Game>;
    doAction(actionCode: string, args: any): void;
}
/* API */

class ClientImpl implements Client {
    subject: BehaviorSubject<Game>;
    currentPlayer: Player;

    constructor(private gs: ServerGame, private userName: string) {
        this.subject = gs.subject;
        this.currentPlayer = gs.game.players.find(player => player.name == userName)!;
    }

    doAction(actionCode: string, args: any) {
        this.currentPlayer.doAction(actionCode, args);
        this.gs.sendRefresh(this.userName);
    }

}

class ServerGame {
    subject = new BehaviorSubject<Game>({id: '', name: '', turn: 0, players: [], hand: [], actions: []});

    constructor(public game: InternalGame) {}

    sendRefresh(userName: string) {
        const currentPlayer = this.game.players.find(player => player.name == userName)!;
        this.subject.next(
            {
                id: this.game.id,
                name: this.game.name,
                turn: this.game.currentTurn,
                players: this.game.players.map(player => ({
                        name: player.name,
                        resources: player.resources,
                        points: player.points,
                        board: player.board.map(emp => ({
                            card: { id: emp.card.id, name: emp.card.name },
                            burnout: emp.burnout,
                            knowledge: emp.knowledge.map(k => ({ id: k.id, name: k.name }))
                        }))
                    })),
                hand: currentPlayer.hand.map(c => ({ id: c.id, name: c.name })),
                actions: currentPlayer.state.availableActions
            }
        );
    }
}

const games: ServerGame[] = [
    new ServerGame(new InternalGame('Mon Game', GameMode.STANDARD)),
    new ServerGame(new InternalGame('Mon Other Game', GameMode.STANDARD))
];

export function loadReadyGames(): Observable<GameSummary[]> {
    return of(games)
        .pipe(map(games => games
            .map(sg => sg.game)
            .filter(game => game.status == GameStatus.READY)
            .map(game => ({ id: game.id, name: game.name, status: game.status}))));
}

export function createGame(gameName: string, mode: GameMode): Observable<string> {
    const newGame = new InternalGame(gameName, mode);
    games.push(new ServerGame(newGame));
    return of(newGame.id);
}

export function loadGame(gameId: string, userName: string): Client {
    const gs = games.filter(game => game.game.id == gameId)[0];
    addPlayer(gs, userName);
    // setTimeout(() => {
    //     // simulate adding other players
    //     addPlayer(gs, "Paulo");
    // }, 1000);
    return new ClientImpl(gs, userName);
}

function addPlayer(gs: ServerGame, userName: string) {
    gs.game.addPlayer(userName);
    gs.sendRefresh(userName);
}
