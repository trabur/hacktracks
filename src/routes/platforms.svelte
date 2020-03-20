<svelte:head>
	<title>Platforms - HACKTRACKS - HT</title>
</svelte:head>

<div style="position: absolute; right: 0; left: 0;">
	<div style="margin-bottom: -150px; box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); padding: 3em 3em 9em; background: #fff; text-align: center;">
		<img src="/keyboard.png" alt="keyboard" style="max-width: 100%;" />
	</div>
	<div style="max-width: 900px; margin: 0 auto 5em;">
		<h1 style="font-weight: 700; margin: 1em 0; color: #111; font-size: 2em; padding: 0 0.5em; line-height: 1em; text-align: left; text-transform: none;">
			Platforms:
		</h1>
		{#each posts as post}
			<Paper elevation={5} style="background: #111; color: #ccc; padding: 1em;">
				<Title><a href={`/spawn-points/${post.id}`}>{post.name}</a> <span style="color: #aaa; float: right; font-size: 0.8em;">[games: 2, maps: 15]</span></Title>
				<Content>
					<p>game list here...</p>
				</Content>
			</Paper>
			<br />
		{/each}
		<MakersToTypes />
	</div>
</div>


<script>
	import Paper, {Title, Subtitle, Content} from '@smui/paper';
	import MakersToTypes from '../components/MakersToTypes';
	
	let posts = [
		{
			name: 'xbox 360',
			id: 'xbox-360',
			games: ['Halo 3', 'Halo Reach']
		},
		{
			name: 'xbox one',
			id: 'xbox-one',
			games: ['Halo 3', 'Halo Reach']
		},
	]
	let username = null;
</script>