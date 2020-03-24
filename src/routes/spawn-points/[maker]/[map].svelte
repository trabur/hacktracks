<script context="module">
	export async function preload(page, session) {
		const { maker, map } = page.params;
		return { maker, map };
	}
</script>

<svelte:head>
  <title>{map || 'Map'} - HACKTRACKS - HT</title>
</svelte:head>

<div style="position: absolute; right: 0; left: 0;">
	<div style="margin-bottom: -100px; box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); background: url('/hauntedrider.png'); height: 500px; background-position: top center; background-size: cover;"></div>
	<div style="max-width: 900px; margin: 0 auto 5em;">
		<Paper elevation={5} style="background: #111; color: #ccc; padding: 1em; min-height: 600px;">
			<Title>{map}<span style="color: #aaa; float: right; font-size: 0.8em;">[kudos: 3]</span></Title>
			<Content>
				<p>map list here...</p>
			</Content>
		</Paper>
		<br />
		<MakersToTypes />
	</div>
</div>

<script>
	import { onMount } from 'svelte';
	import Paper, {Title, Subtitle, Content} from '@smui/paper';
	import MakersToTypes from '../../../components/MakersToTypes';

  export let map;
	// export let maker;
	
	onMount(() => {
    // google analytics
    gtag('config', 'UA-161516824-1', {
      'page_path': window.location.pathname
    });
	})
</script>