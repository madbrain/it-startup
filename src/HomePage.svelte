<script lang="ts">
    import { onMount } from "svelte";
    import { link, replace } from 'svelte-spa-router';
    import EditableField from './EditableField.svelte';
    import { userName } from './store';
    import { loadReadyGames, type GameSummary } from './server';

    let games: GameSummary[] = [];

    function newGame() {
        replace('/newgame');
    }

    function changeName(newName: string) {
        userName.set(newName);
    }

    onMount(() => {
        const sub = loadReadyGames()
            .subscribe((g) => games = g);
        return () => {
            sub.unsubscribe();
        }
    });

</script>

<h1>IT Startup</h1>
<div>
    <div>
        <button on:click={() => newGame()}>Créer une nouvelle partie</button>
        <span>Login: <EditableField value={$userName} on:change={e => changeName(e.detail)} /></span>
    </div>
    <ul>
        {#each games as game}
        <li>
            <a href="/game/{game.id}" use:link>{game.name}</a>
        </li>
        {/each}
    </ul>
</div>

<style>
ul {
    list-style: none;
}
</style>