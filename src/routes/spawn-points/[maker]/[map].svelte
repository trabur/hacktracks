<script context="module">
	export async function preload(page, session) {
		const { maker, map } = page.params;
		return { maker, map };
	}
</script>

<svelte:head>
  <title>{map || 'Map'} - HACKTRACKS - HT</title>
</svelte:head>

<div style="height: 100%; width: 100%;">
	<div style="margin-bottom: -100px; box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); background: url('/hauntedrider.png'); height: 500px; background-position: top center; background-size: cover;"></div>
	<div style="max-width: 900px; margin: 0 auto 5em;">
		<Paper elevation={5} style="color: #111; padding: 1em;">
			<div>
				<Title>
					<img src={`avatars/map-maker-avatar.png`} alt={'#map'} class="mobile hidden" style="margin-right: 1em; margin-top: -3em; float: left; width: 100px;" />
					<span>{map}</span>
					<Button class="mobile hidden" color="secondary" variant="unelevated" style='float: right;'>
						<Label>DOWNLOAD</Label>
					</Button>
					<Button class="mobile only" color="secondary" variant="unelevated" style='width: 100%; margin-top: 1em;'>
						<Label>DOWNLOAD</Label>
					</Button>
				</Title>
				<br />
				<TabBar tabs={navigation} let:tab bind:active style='margin: 0px;'>
					<Tab {tab} minWidth>
						{#if tab === 'README.md'}
							<Label>{tab}</Label>
						{/if}
						{#if tab === ':)Kudos'}
							<Label>{tab} [{kudosCount}]</Label>
						{/if}
					</Tab>
				</TabBar>
			</div>

			<div style="color: #ccc; background: #111; margin: 0 -1em -1em; min-height: 600px; border-radius: 0 0 4px 4px;">
				<Content style="padding: 1em;">
					<p>description content etc... description content etc... description content etc...</p>
				</Content>
			</div>
		</Paper>
		<br />
		<MakersToTypes />
	</div>
</div>

<script>
	import { onMount } from 'svelte';
  import Button, {Group, GroupItem, Icon} from '@smui/button';
  import Tab, {Label} from '@smui/tab';
  import TabBar from '@smui/tab-bar';
	import Paper, {Title, Subtitle, Content} from '@smui/paper';
	import MakersToTypes from '../../../components/MakersToTypes';

  let active = 'README.md';
  let navigation = ['README.md', ':)Kudos']
  export let map;
  let kudosCount = 0;
	
	onMount(() => {
    // google analytics
    gtag('config', 'UA-161516824-1', {
      'page_path': window.location.pathname
    });
	})
</script>