<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`library.json`).then(r => r.json()).then(posts => {
			// the library list is randomized for fairness
			posts.sort(() => Math.random() - 0.5)
			let mapMakers = posts.filter((post) => {
				return post.mapMaker === true
			})
			let testers = posts.filter((post) => {
				return post.tester === true
			})
			let leads = posts.filter((post) => {
				return post.lead === true
			})
			return { mapMakers, testers, leads };
		});
	}
</script>

<svelte:head>
	<title>HACKTRACKS Map Library - HACKTRACKS - HT</title>
</svelte:head>

<div style="height: 100%; width: 100%;">
	<div style="margin-bottom: -130px; box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); background: url('/foundry.jpg'); height: 500px; background-position: top center; background-size: cover;"></div>
	<div style="max-width: 900px; margin: 0 auto 5em;">
		<h1 style="font-weight: 700; margin: 1em 0; text-shadow: 0 0 0.4em #000; color: #eee; font-size: 2em; padding: 0 0.5em; line-height: 1em; text-align: left; text-transform: none;">
			HACKTRACKS Map Library:
		</h1>
		<Paper elevation={5} style="background: #F8C040; color: #000; padding: 1em; margin-bottom: 3em;">
			<Group variant="outlined" style="display: flex;">
				<Button on:click={() => mode = "#map-makers"} variant="unelevated" color={mode === "#map-makers" ? "primary": "secondary"} style="flex-grow: 1;"><Label>#map-makers</Label></Button>
				<Button on:click={() => mode = "@testers"} variant="unelevated" color={mode === "@testers" ? "primary": "secondary"} style="flex-grow: 1;"><Label>@testers</Label></Button>
				<Button on:click={() => mode = "^leads"} variant="unelevated" color={mode === "^leads" ? "primary": "secondary"} style="flex-grow: 1;"><Label>^leads</Label></Button>
			</Group>
		</Paper>
		{#if mode === "#map-makers"}
			{#each mapMakers as post}
				<Paper elevation={5} style="background: #111; color: #ccc; padding: 1em; margin-bottom: 3em; padding-top: 0.5em;">
					<Title class="mobile hidden" style="position: relative;">
						<img src={`${post.avatar}`} alt={post.gamertag} style="width: 100px; position: absolute; left: 0; top: -42px;" />
						<a href={`/spawn-points/${post.id}`} style="margin-left: 110px;">{post.gamertag}</a> <span style="color: #aaa; float: right; font-size: 0.8em;">[maps: {post.mapsMade}, kudos: {post.kudosGiven}]</span>
					</Title>
					<Title class="mobile only">
						<a href={`/spawn-points/${post.id}`}>{post.gamertag}</a> <span style="color: #aaa; float: right; font-size: 0.8em;">[maps: {post.mapsMade}, kudos: {post.kudosGiven}]</span>
					</Title>
					<Content>
						<img src={post.coverPhoto || "hauntedrider.png"} style="width: 100%;" alt={post.gamertag} />
					</Content>
				</Paper>
			{/each}
			<ReadyToMapMake />
		{/if}
		{#if mode === "@testers"}
			<Paper elevation={5} style="background: #111; color: #ccc; padding: 1em;">
				<ol class="posts">
					{#each testers as post}
						<li class="html"><a href={`/spawn-points/${post.id}`}>{post.gamertag}</a> <span class="stats">[maps: {post.mapsMade}, kudos: {post.kudosGiven}]</span></li>
					{/each}
				</ol>
			</Paper>
			<br />
			<ReadyToMapTest />
		{/if}
		{#if mode === "^leads"}
			<Paper elevation={5} style="background: #111; color: #ccc; padding: 1em;">
				<ol class="posts">
					{#each leads as post}
						<li class="html"><a href={`/spawn-points/${post.id}`}>{post.gamertag}</a> <span class="stats">[maps: {post.mapsMade}, kudos: {post.kudosGiven}]</span></li>
					{/each}
				</ol>
			</Paper>
			<br />
			<br />
			<br />
		{/if}
	</div>
</div>

<script>
	import { onMount } from 'svelte';
	import Paper, {Title, Subtitle, Content} from '@smui/paper';
	import ReadyToMapMake from '../../components/ReadyToMapMake';
	import ReadyToMapTest from '../../components/ReadyToMapTest';
  import Button, {Group, GroupItem, Label, Icon} from '@smui/button';
	
	export let mapMakers;
	export let testers;
	export let leads;
  let clicked = 0;
	let username = null;
	let mode = '#map-makers';

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