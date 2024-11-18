<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Employee } from "./api";
    export let employee : { employee: Employee, selected: boolean };

    const dispatcher = createEventDispatcher();

    $: stack = employee.employee.knowledge.concat(employee.employee.card);

    function toggleSelection() {
        employee.selected = ! employee.selected;
        dispatcher("select", employee);
    }
</script>

<div class="employee" on:click={() => toggleSelection()} class:selected={employee.selected}>
    <ul>
        {#each new Array(employee.employee.burnout) as burnout}
        <li><span class="burnout"></span></li>
        {/each}
    </ul>
    <div class="stack" style="width: {200+(stack.length-1)*10}px; height: {280+(stack.length-1)*25}px">
        {#each stack as card, index}
            <img style="top: {index*25}px; left: {index*10}px;" src={`images/img_${card.id}.png`} alt={card.name}>
        {/each}
    </div>
</div>

<style>
.employee {
    padding: 0px 10px;
}
.selected {
    border-radius: 10px;
    border: red 3px solid;
}
ul {
    list-style: none;
    margin: 5px 0px;
}
li {
    display: inline-block;
}
.burnout {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin: 3px;
    background-color: #CC0000;
    border: #990000 1px solid;
    border-radius: 50%;
}
.stack {
    position: relative;
}
.stack img {
    position: absolute;
}
img {
    width: 200px;
}
</style>