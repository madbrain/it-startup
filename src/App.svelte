<script lang="ts">
	import Router from 'svelte-spa-router';
	import HomePage from './HomePage.svelte';
	import GamePage from './GamePage.svelte';
	import NewGamePage from './NewGamePage.svelte';

	const routes = {
		'/': HomePage,
		'/newgame': NewGamePage,
		'/game/:gameId': GamePage,
		'*': HomePage,
	}
</script>

<main>
	<Router {routes}/>
</main>

<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>