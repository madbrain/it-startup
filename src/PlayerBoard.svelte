<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import Employee from "./Employee.svelte";
    import type { Player } from "./api";
    
    const dispatcher = createEventDispatcher();
    export let player: Player;

    $: employees = player.board.map((emp, i) => ({ employee: emp, index: i, selected: false }));

    function selectEmployee(x) {
        if (x.selected) {
            employees.forEach(emp => {
                if (emp != x) {
                    emp.selected = false;
                }
            })
            dispatcher("select", x.index);
        } else {
            dispatcher("select", -1);
        }
    }
</script>

<div class="player">
    <div class="info">
        <h1>{player.name}</h1>
        <ul>
            <li>
                <span>resources: {player.resources}</span>
            </li>
            <li>
                <span>points: {player.points}</span>
            </li>
        </ul>
    </div>
    <div class="cards">
        {#each employees as employee}
            <Employee employee={employee} on:select={(e) => selectEmployee(e.detail)}/>
        {/each}
    </div>
</div>

<style>
.player {
    border: 1px solid black;
    padding: 1em;
    display: flex;
}

.cards {
    display: flex;
}
</style>
