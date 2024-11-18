<script lang="ts">
    import {createEventDispatcher} from "svelte";
    export let value;
    let editMode = false;
    let dispatcher = createEventDispatcher();

    function switchToEdit() {
        editMode = true;
    }

    function switchToView() {
        editMode = false;
        dispatcher('change', value);
    }
</script>

<div>
    {#if editMode}
    <input on:blur={() => switchToView()} bind:value={value}>
    {:else}
    <span on:click={() => switchToEdit()}>{value}</span>
    {/if}
</div>

<style>
    div {
        display: inline;
    }
</style>