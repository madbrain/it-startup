<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Card } from './api';

    const dispatcher = createEventDispatcher();
    export let cards: Card[] = [];
    
    interface Item {
        selected: boolean;
        card: Card;
        index: number;
    }
    
    $: selectableCards = cards.map((card, i) => ({ selected: false, index: i, card }));

    function toggleSelect(item: Item) {
        item.selected = ! item.selected;
        selectableCards = selectableCards.slice();
        const selection = selectableCards
            .filter(item => item.selected)
            .map(item => item.index);
        dispatcher('change', selection);
    }
</script>

<div class="hand">
    {#each selectableCards as item}
    <img class:selected={item.selected} src={`images/img_${item.card.id}.png`} alt={item.card.name} on:click={() => toggleSelect(item)}>
    {/each}
</div>

<style>
.hand {
    display: flex;
}

.hand img {
    width: 200px;
}

.selected {
    position: relative;
    top: 10px;
    left: 10px;
    box-shadow: black 5px 5px 10px;
}
</style>