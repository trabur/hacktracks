<svelte:head>
	<title>HACKTRACKS Games & Consoles - HACKTRACKS - HT</title>
</svelte:head>

<div style="height: 100%; width: 100%;">
	<div style="margin-bottom: -150px; box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); padding: 3em 3em 9em; background: #fff; text-align: center;">
		<img src="/keyboard.png" alt="keyboard" style="max-width: 100%;" />
	</div>
	<div style="max-width: 900px; margin: 0 auto 5em;">
		<h1 style="font-weight: 700; margin: 1em 0; color: #111; font-size: 2em; padding: 0 0.5em; line-height: 1em; text-align: left; text-transform: none;">
			HACKTRACKS Games & Consoles:
		</h1>
		{#each posts as post}
			<Paper elevation={5} style="background: #111; color: #ccc; padding: 1em;">
				<Title>Games: <span style="float: right;">platform ({post.name})</span></Title>
				<Content>
					<ol class="posts">
						{#each post.games as game}
							<li class="html">{game.name} <span class="stats">[maps: {game.maps}, kudos: {game.kudos}]</span></li>
						{/each}
					</ol>
				</Content>
			</Paper>
			<br />
		{/each}
		<MakersToTypes />
	</div>
</div>


<script>
	import { onMount, onDestroy } from 'svelte';
	import Paper, {Title, Subtitle, Content} from '@smui/paper';
	import MakersToTypes from '../components/MakersToTypes';
	
	let posts = [
		{
			name: 'xbox 360',
			id: 'xbox-360',
			games: [
				{
					name: 'Halo 3',
					maps: 10,
					kudos: 2
				}, {
					name: 'Halo Reach',
					maps: 12,
					kudos: 2
				}
			]
		},
		{
			name: 'xbox one',
			id: 'xbox-one',
			games: [
				{
					name: 'Halo 3',
					maps: 10,
					kudos: 2
				}, {
					name: 'Halo Reach',
					maps: 12,
					kudos: 2
				}
			]
		},
	]
	let username = null;

	onMount(() => {
    // google analytics
    gtag('config', 'UA-161516824-1', {
      'page_path': window.location.pathname
    });
	})
</script>

<style>
	.posts {
    padding: 0;
    border-top: 1px solid #444;
	}

  .posts .html {
		display: block;
    padding: 0.5em;
    border-bottom: 1px solid #444;
	}

	.posts .html .stats {
		float: right;
	}
</style>