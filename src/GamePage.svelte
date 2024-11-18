
<script lang="ts">
    import { onMount } from 'svelte';
	import type { Game } from "./api";
    import type { Client } from './server';
    import PlayerBoard from "./PlayerBoard.svelte";
    import PlayerHand from "./PlayerHand.svelte";
    import { loadGame } from './server';
    import { userName } from './store';
    
    export let params: { gameId: string };

    let game: Game = {
        id: "",
        name: "",
        turn: 0,
        players: [],
        hand: [],
        actions: []
    };
    let client : Client;
    let selection: number[] = [];
    let employeeSelection = -1;

    onMount(() => {
        userName.subscribe(name => {
            client = loadGame(params.gameId, name);
            client.subject.subscribe(g => {
                game = g;
                selection = [];
            })
        });
    })

    function changeSelection(aSelection: number[]) {
        selection = aSelection;
    }
    function changeEmployeeSelection(aSelection: number) {
        employeeSelection = aSelection;
    }
</script>

<div>
    <h1>{game.name} (turn: {game.turn})</h1>
    {#each game.players as player}
    <PlayerBoard player={player} on:select={(e) => changeEmployeeSelection(e.detail)} />
    {/each}
    
    <div class="actions">
        {#each game.actions as action}
        <button on:click={() => client.doAction(action.code, {selection, employeeSelection})}>{action.label}</button>
        {/each}
    </div>

    <PlayerHand cards={game.hand} on:change={(e) => changeSelection(e.detail)}/>
</div>

<style>
.actions {
    margin-top: 1em;
}
</style>