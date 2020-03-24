<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`library.json`).then(r => r.json()).then(posts => {
			// the map makers list is randomized for fairness
			posts.sort(() => Math.random() - 0.5)
			return { posts };
		});
	}
</script>

<svelte:head>
	<title>The Library - HACKTRACKS - HT</title>
</svelte:head>

<div style="position: absolute; right: 0; left: 0;">
	<div style="margin-bottom: -130px; box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); background: url('/foundry.jpg'); height: 500px; background-position: top center; background-size: cover;"></div>
	<div style="max-width: 900px; margin: 0 auto 5em;">
		<h1 style="font-weight: 700; margin: 1em 0; text-shadow: 0 0 0.4em #000; color: #eee; font-size: 2em; padding: 0 0.5em; line-height: 1em; text-align: left; text-transform: none;">
			The Library:
		</h1>
		<Paper elevation={5} style="background: #F8C040; color: #000; padding: 1em;">

			<Group variant="outlined" style="display: flex;">
				<Button on:click={() => mode = "#map-makers"} variant="unelevated" color={mode === "#map-makers" ? "primary": "secondary"} style="flex-grow: 1;"><Label>#map-makers</Label></Button>
				<Button on:click={() => mode = "@testers"} variant="unelevated" color={mode === "@testers" ? "primary": "secondary"} style="flex-grow: 1;"><Label>@testers</Label></Button>
				<Button on:click={() => mode = "^Leads"} variant="unelevated" color={mode === "^Leads" ? "primary": "secondary"} style="flex-grow: 1;"><Label>^Leads</Label></Button>
			</Group>
		</Paper>
		<br />
		{#each posts as post}
			<Paper elevation={5} style="background: #111; color: #ccc; padding: 1em;">
				<Title><a href={`/spawn-points/${post.id}`}>{post.gamertag}</a> <span style="color: #aaa; float: right; font-size: 0.8em;">[maps: 15, kudos: 3]</span></Title>
				<Content>
					<img src={post.coverPhoto || "hauntedrider.png"} style="width: 100%;" alt={post.gamertag} />
				</Content>
			</Paper>
			<br />
		{/each}
		<ReadyToMapMake username={username} />
	</div>
</div>

<script>
	import Paper, {Title, Subtitle, Content} from '@smui/paper';
	import ReadyToMapMake from '../../components/ReadyToMapMake';
  import Button, {Group, GroupItem, Label, Icon} from '@smui/button';
	
	export let posts;
  let clicked = 0;
	let username = null;
	let mode = '#map-makers';
</script>