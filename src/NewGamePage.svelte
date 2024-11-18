<script lang="ts">
    import { push } from 'svelte-spa-router';
    import EditableField from './EditableField.svelte';
    import { createGame } from './server';
    import { GameMode } from './api';

    let gameName = "Ma super partie";
    let mode = GameMode.STANDARD;

    function startGame() {
        createGame(gameName, mode)
            .subscribe(gameId => {
                push(`/game/${gameId}`);
            })
    }

    function changeName(newName: string) {
        gameName = newName;
    }

</script>

<h1>New Game</h1>

<div>
    <div>
        <span>Name: <EditableField value={gameName} on:change={e => changeName(e.detail)} /></span>
    </div>
    <div>Mode: <select bind:value={mode}>
            <option value="STANDARD">Standard</option>
            <option value="FAST">Fast</option>
            <option value="LONG">Long</option>
        </select>
    </div>
    <div>
        <button on:click={() => startGame()}>Démarrer</button>
    </div>
</div>