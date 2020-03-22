
<style>
	.favorites {
    padding: 0;
    border-top: 1px solid #444;
	}

  .favorites .html {
		display: block;
    padding: 0.5em;
    border-bottom: 1px solid #444;
	}

	.favorites .html .stats {
		float: right;
	}
</style>

<Paper elevation={5} style="background: #111; color: #ccc;">
  <Title>HACKTRACKS Map Library:<span style="float: right;">(favorites)</span></Title>
  <ol class="favorites">
    {#each favorites as favorite}
      <li class="html">{favorite.name}<span class="stats">[kudos: {favorite.kudos}, downloads: {favorite.downloads}]</span></li>
    {/each}
</Paper>

<script>
	import { onMount, onDestroy } from 'svelte';
  import Paper, {Title, Subtitle, Content} from '@smui/paper';

	let favorites = [
		{
			name: "Speedway",
			downloads: "15k",
			kudos: "5"
		},
		{
			name: "Over The Edge",
			downloads: "15k",
			kudos: "5"
		},
		{
			name: "WallRider",
			downloads: "15k",
			kudos: "5"
		},
		{
			name: "HauntedRider",
			downloads: "15k",
			kudos: "5"
		},
	]

	// the favorites list is randomized for fairness
  favorites.sort(() => Math.random() - 0.5)
</script>