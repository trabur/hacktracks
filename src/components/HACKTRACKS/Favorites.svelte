
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
  <Title><span class="mobile hidden">HACKTRACKS</span> Map Library:<span style="float: right;">(favorites)</span></Title>
  <ol class="favorites">
    {#each favorites as favorite}
      <li class="html">{favorite.name}<span class="stats">:)kudos [{favorite.kudos}] ~posts [{favorite.posts}]</span></li>
    {/each}
	</ol>
</Paper>

<script>
	import { onMount, onDestroy } from 'svelte';
  import Paper, {Title, Subtitle, Content} from '@smui/paper';

	// no more than four maps allowed!
	let favorites = [
		{
			name: "Speedway",
			posts: "3",
			kudos: "5"
		},
		{
			name: "Over The Edge",
			posts: "3",
			kudos: "5"
		},
		{
			name: "WallRider",
			posts: "3",
			kudos: "5"
		},
		{
			name: "HauntedRider",
			posts: "3",
			kudos: "5"
		},
	]

	// the favorites list is randomized for fairness
  favorites.sort(() => Math.random() - 0.5)
</script>