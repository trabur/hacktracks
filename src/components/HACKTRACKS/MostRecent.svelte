
<style>
	.maps {
    padding: 0;
    border-top: 1px solid #444;
	}

  .maps .html {
		display: block;
    padding: 0.5em;
    border-bottom: 1px solid #444;
	}

	.maps .html .stats {
		float: right;
	}
</style>

<Paper elevation={5} class="mobile hidden" style="background: #111; color: #ccc; flex: 1; margin-left: 0.5em;">
  <Title><span class="mobile hidden">Latest 5</span> Maps:<span style="float: right;">(most recent)</span></Title>
  <ol class="maps">
    {#each maps as map}
      <li class="html">{map.name}<span class="stats">[kudos: {map.kudos}, replies: {map.replies}]</span></li>
    {/each}
	</ol>
</Paper>

<script>
	import { onMount, onDestroy } from 'svelte';
  import Paper, {Title, Subtitle, Content} from '@smui/paper';

	// no more than five maps allowed!
	let maps = [
		{
			name: "Speedway",
			replies: "3",
			kudos: "5"
		},
		{
			name: "Over The Edge",
			replies: "3",
			kudos: "5"
		},
		{
			name: "WallRider",
			replies: "3",
			kudos: "5"
		},
		{
			name: "HauntedRider",
			replies: "3",
			kudos: "5"
		},
		{
			name: "Something",
			replies: "3",
			kudos: "5"
		},
	]

	// the maps list is randomized for fairness
  maps.sort(() => Math.random() - 0.5)
</script>