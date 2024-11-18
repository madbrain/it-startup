import { employeeCardTypes, knowledgeCardTypes, actionCardTypes, CardKind, EmployeeKind } from "./cards";
import { type CardType, type EmployeeCardType, type KnowledgeCardType } from "./cards";
import { GameMode, GameStatus } from "./api";
import { type Action } from "./api";

export const allCardTypes = (<CardType[]>employeeCardTypes).concat(knowledgeCardTypes, actionCardTypes);

const MaxResourceByTurn = 8;

export interface PlayerState {
    execute(player: Player): void;
    doAction(player: Player, code: string, args: any): PlayerState;
    availableActions: Action[];
}

class IdleState implements PlayerState {
    availableActions = [
        { code: "start-game", label: "Démarrer" }
    ];

    execute(player: Player) {
    }

    doAction(player: Player, code: string, args: any): PlayerState {
        if (code == "start-game") {
            player.game.start();
        }
        return player.state;
    }
}

class GetFirstHand implements PlayerState {

    availableActions = [
        { code: "continue", label: "Continuer" },
        { code: "change-cards", label: "Changer les cartes" }
    ];

    execute(player: Player) {
        player.hand = player.game.deck.draw(5);
    }

    doAction(player: Player, code: string, args: any): PlayerState {
        if (code == "change-cards") {
            const selection: number[] = args['selection'];
            for (let i = selection.length-1; i >= 0; i--) {
                const card = player.hand.splice(selection[i], 1);
                player.game.deck.discard(card);
            }
            player.game.deck.draw(selection.length).forEach(card => player.hand.push(card));
        }
        player.state = new WaitState();
        player.game.checkAllPlayerReady();
        return player.state;
    }
}

class WaitState implements PlayerState {
    availableActions = [];

    execute(player: Player) {
    }
    
    doAction(player: Player, code: string, args: any): PlayerState {
        return this;
    }
}

class TurnState implements PlayerState {
    availableActions = [
        { code: "sell", label: "Vendre les cartes" },
        { code: "buy", label: "Acheter une carte" },
        { code: "play", label: "Jouer la carte" },
        { code: "end", label: "Terminer son tour" },
    ];

    execute(player: Player) {
        player.game.deck.draw(1).forEach(card => player.hand.push(card));
        player.resources += Math.min(MaxResourceByTurn, player.game.currentTurn);
    }
    
    doAction(player: Player, code: string, args: any): PlayerState {
        const selection: number[] = args['selection'];
        if (code == "play" && selection.length == 1) {
            const card = player.hand.filter((card, i) => i == selection[0])[0];
            if (player.resources >= card.cost) {
                if (card.kind == CardKind.EMPLOYEE) {
                    player.resources -= card.cost;
                    player.hand.splice(selection[0], 1);
                    player.board.push(new Employee(<EmployeeCardType>card));
                    // TODO execute "when played" actions
                } else if (card.kind == CardKind.KNOWLEDGE) {
                    return new SelectDeveloperState((<KnowledgeCardType>card), selection[0]);
                } else {
                    player.resources -= card.cost;
                    player.hand.splice(selection[0], 1);
                    // TODO execute "when played" actions
                    console.log("play ACTION", card);
                }
            }
        } else if (code == "end") {
            // Count points
            // TODO special points card : "Scrum Master"
            // TODO special points card : "Knowledge"
            player.board.forEach(emp => {
                const efficiency = emp.card.efficiency || 0;
                player.points += efficiency;
                emp.knowledge.forEach(k => {
                    player.points += k.efficiency;
                });
            });
            // Update burnout
            // TODO don't count burnout when "vacation time" played
            player.board.forEach(emp => {
                emp.burnout += 1;
            });
            player.board = player.board.filter(emp => {
                const resistance = emp.card.burnoutResistance || 0;
                return emp.burnout < (3 + resistance);
            });

            // TODO resources can be accumulated but with a maximum depending on the number of players

            player.game.nextPlayer();
        } else {
            console.log("TurnState", code, args);
        }
        // - sell cards : get one resource for each card
        // - buy cards : 2 resources for each card
        // - transfer knowledge
        
        return this;
    }
}

class SelectDeveloperState implements PlayerState {
    availableActions = [
        { code: "add-knowledge", label: "Ajouter les Connaissances" },
        { code: "cancel", label: "Annuler" },
    ];
    
    constructor(private card: KnowledgeCardType, private index: number) {}

    execute(player: Player) {
    }

    doAction(player: Player, code: string, args: any): PlayerState {
        const emp = player.board[args.employeeSelection];
        if (code == "add-knowledge" && emp && emp.card.employeeKind == EmployeeKind.DEV) {
            player.resources -= this.card.cost;
            player.hand.splice(this.index, 1);
            emp.knowledge.push(this.card);
        }
        return new TurnState();
    }
}

export class Employee {
    knowledge: KnowledgeCardType[] = [];
    burnout = 0;
    constructor (public card: EmployeeCardType) {}
}

export class Player {

    points = 0;
    hand: CardType[] = [];
    board: Employee[] = [];
    state: PlayerState = new IdleState();
   
    constructor(public game: Game, public name: string, public resources: number) {}

    doAction(code: string, args: any) {
        this.state = this.state.doAction(this, code, args);
    } 

    changeState(newState: PlayerState) {
        this.state = newState;
        this.state.execute(this);
    }
}

class Deck {
    
    cards: CardType[] = [];
    
    constructor() {
        allCardTypes.forEach(cardType => {
            for (let i = 0; i < cardType.count; ++i) {
                this.cards.push(cardType);
            }
        });
        this.shuffle();
    }

    draw(count: number): CardType[] {
        // TODO check availability
        return this.cards.splice(0, count);
    }

    discard(cards: CardType[]) {
        this.cards.push(...cards);
    }

    private shuffle() {
        for(let i = this.cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = this.cards[i]
            this.cards[i] = this.cards[j]
            this.cards[j] = temp
          }
    }
}

export class Game {

    id: string;
    status = GameStatus.READY;
    currentTurn = 1;
    currentPlayer = 0;
    players: Player[] = [];
    deck = new Deck();
    startResources: number;
    
    constructor(public name: string, private mode: GameMode) {
        this.id = newId();
        this.startResources = Math.floor(Math.random() * 6) + 1;
    }

    addPlayer(playerName: string) {
        if (this.status != GameStatus.READY) {
            // TODO error not correct state
        } else if (this.players.some(player => player.name == playerName)) {
            // TODO error user already connected
        } else if (this.players.length < 4) {
            this.players.push(new Player(this, playerName, this.startResources));
        } else {
            // TODO indicate error
        }
    }

    start() {
        this.status = GameStatus.STARTED;
        this.players.forEach(player => {
            player.changeState(new GetFirstHand());
        });
    }

    checkAllPlayerReady() {
        if (this.players.every(player => player.state.availableActions.length == 0)) {
            const player = this.players[this.currentPlayer];
            player.changeState(new TurnState());
        }
    }

    nextPlayer() {
        this.players[this.currentPlayer].changeState(new WaitState());
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        if (this.currentPlayer == 0) {
            this.currentTurn += 1;
        }
        this.players[this.currentPlayer].changeState(new TurnState());
    }
    
}

function newId() {
    let result = "";
    for (let i = 0; i < 8; ++i) {
        result += String.fromCharCode('A'.charCodeAt(0) + Math.random() * 26)
    }
    return result;
}
