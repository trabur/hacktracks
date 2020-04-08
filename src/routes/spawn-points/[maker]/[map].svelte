<script context="module">
	export async function preload(page, session) {
		const { maker, map } = page.params;
		return { maker, map };
	}
</script>

<svelte:head>
  <title>{name || 'Map'} - HACKTRACKS - HT</title>
</svelte:head>

<div style="height: 100%; width: 100%;">
	<div style={`margin-bottom: -100px; box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); background: url(${photo}); height: 500px; background-position: top center; background-size: cover;`}></div>
	<div style="max-width: 900px; margin: 0 auto 5em;">
		<Paper elevation={5} style="color: #111; padding: 1em;">
			<div>
				<Title>
					<img src={`avatars/map-maker-avatar.png`} alt={'#map'} class="mobile hidden" style="margin-right: 1em; margin-top: -3em; float: left; width: 100px;" />
					<span>{name}</span>
					<Button href={download} target="_blank" class="mobile hidden" color="secondary" variant="unelevated" style='float: right;'>
						<Label>#MAP DOWNLOAD</Label>
					</Button>
					<Button href={download} target="_blank" class="mobile only" color="secondary" variant="unelevated" style='width: 100%; margin-top: 1em;'>
						<Label>#MAP DOWNLOAD</Label>
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
						{#if tab === '~Posts'}
							<Label>{tab} [{postsCount}]</Label>
						{/if}
					</Tab>
				</TabBar>
			</div>

			<div style="color: #ccc; background: #111; margin: 0 -1em -1em; min-height: 600px; border-radius: 0 0 4px 4px;">
				<Content style="padding: 1em;">
					{#if username === account}
						{#if edit}
							<Button color="secondary" variant="unelevated" style="float: right; margin: 0 0 0.5em 0.5em;" on:click={save}>
								<Label>SAVE</Label>
							</Button>
							<Button color="secondary" variant="outlined" style="float: right; margin: 0 0 0.5em 0.5em;" on:click={() => edit = !edit}>
								<Label>CANCEL</Label>
							</Button>
							<div>
      					<Textfield color='secondary' type='text' bind:value={name} label="name" style="width: 100%; background: #aaa;" />
							</div>
							<br />
							<div>
      					<Textfield color='secondary' type='text' bind:value={download} label="download" style="width: 100%; background: #aaa;" />
							</div>
							<br />
							<div>
      					<Textfield color='secondary' type='text' bind:value={photo} label="cover photo" style="width: 100%; background: #aaa;" />
							</div>
							<br />
      				<Textarea type='text' bind:value={body} label="body" variant="outlined" style="min-height: 300px; width: 100%; background: #aaa;" />
							<br />
							<hr>
						{:else}
							<Button color="secondary" variant="outlined" style="float: right;" on:click={() => edit = !edit}>
								<Label>EDIT</Label>
							</Button>
						{/if}
					{/if}
					<span>Created by: <a href={`/spawn-points/${maker}`}>{username}</span><br />
					<span>Created at: {createdAt}</span><br />
					<div bind:this={html}></div>
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
  import Textfield, {Input, Textarea} from '@smui/textfield';

	let html;
  let active = 'README.md';
  let navigation = ['README.md', ':)Kudos', '~Posts']
  export let map;
	export let maker;
	let kudosCount = 0;
	let postsCount = 0;
  let username = '';
  let account = 'HT';
	let name = '';
	let body = '';
	let edit = false;
	let download = '';
	let photo = 'hauntedrider.png';
	let createdAt = '';
	
	onMount(() => {
    let gun = new Gun(['https://gunjs.herokuapp.com/gun']);
    let user = gun.user();
    
    user.recall({ sessionStorage: true }, (recalled) => {
      console.log('recalled', recalled)
      account = recalled.put.alias;
    })

    gun.user(maker).once((data, key) => {
      console.log('spawn point data: ', data)
			username = data.alias
    });

    gun.get(maker).get('hacktracks.org').get('maps').get(map).on((data, key) => {
      if (data === null) { // data was removed
        console.log('ht maps', key)
      } else if (data) { // data was added / updated
        console.log('ht maps', data)
				name = data.name
				download = data.download || ''
				photo = data.photo || 'hauntedrider.png'
				body = data.body || 'From Ideas. To Checkpoints. With Forge.'
				html.innerHTML = body
				createdAt = data.createdAt
      }
    })

    // google analytics
    gtag('config', 'UA-161516824-1', {
      'page_path': window.location.pathname
    });
	})

  function save() {
    let gun = new Gun(['https://gunjs.herokuapp.com/gun']);
    let saveCount = 0;

    gun.get(maker).get('hacktracks.org').get('maps').get(map).get('name').put(name).once((data, key) => {
			console.log('saved name', data)
      finish()
		})

    gun.get(maker).get('hacktracks.org').get('maps').get(map).get('download').put(download).once((data, key) => {
			console.log('saved download', data)
      finish()
		})

    gun.get(maker).get('hacktracks.org').get('maps').get(map).get('photo').put(photo).once((data, key) => {
			console.log('saved photo', data)
      finish()
		})

    gun.get(maker).get('hacktracks.org').get('maps').get(map).get('body').put(body).once((data, key) => {
			console.log('saved body', data)
      finish()
		})
		
    function finish() {
			saveCount++
      if (saveCount === 4) {
				alert('Success, your map has been updated! :)')
	      edit = false;
      }
    }
	}
</script>