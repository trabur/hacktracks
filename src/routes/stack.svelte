<style>
  .container {
		margin: 0 auto;
		padding: 1em;
		min-width: 300px;
    max-width: 600px;
    width: 100%;
  }

	.posts {
    padding: 0;
    border-top: 1px solid #ccc;
	}

  .posts .html {
		display: block;
    padding: 0.5em;
    border-bottom: 1px solid #ccc;
	}

	.posts .html .stats {
		float: right;
	}
</style>

<svelte:head>
  <title>Stack - HACKTRACKS - HT</title>
</svelte:head>

<div class="container">
  <h4 style="color: #ccc;">{account} --> stack:</h4>
  <Paper elevation={4}>
    <p style="margin-top: 0;">Give this stack a name for others to see:</p>
    <Textfield type='text' bind:value={name} label="Title" variant="outlined" style="width: 100%;" />
    <p>4 favorite maps which will be displayed in random order:</p>
    <div style="display: flex; margin-top: 0.5em;">
      <Textfield type='text' bind:value={favoriteSpawnPointId1} label="spawn-point id" variant="outlined" style="flex: 1;" />
      <Textfield type='text' bind:value={favoriteMapId1} label="map id" variant="outlined" style="flex: 1;" />
    </div>
    <div style="display: flex; margin-top: 0.5em;">
      <Textfield type='text' bind:value={favoriteSpawnPointId2} label="spawn-point id" variant="outlined" style="flex: 1;" />
      <Textfield type='text' bind:value={favoriteMapId2} label="map id" variant="outlined" style="flex: 1;" />
    </div>
    <div style="display: flex; margin-top: 0.5em;">
      <Textfield type='text' bind:value={favoriteSpawnPointId3} label="spawn-point id" variant="outlined" style="flex: 1;" />
      <Textfield type='text' bind:value={favoriteMapId3} label="map id" variant="outlined" style="flex: 1;" />
    </div>
    <div style="display: flex; margin-top: 0.5em;">
      <Textfield type='text' bind:value={favoriteSpawnPointId4} label="spawn-point id" variant="outlined" style="flex: 1;" />
      <Textfield type='text' bind:value={favoriteMapId4} label="map id" variant="outlined" style="flex: 1;" />
    </div>

    <div style="display: flex;">
      <Button variant="unelevated" on:click={save} color='primary' style='flex: 1; margin-top: 0.5em;'>
        <Label>Set</Label>
      </Button>
    </div>
    <br />
    <br />
    <p>People in the following list may contribute additional content to your maps such as :)kudos and ~posts. Toggle roles for each person to keep status within the stack orderly.</p>
    <ol class="posts" style="flex: 1;">
      {#each posts as post}
        <li class="html">
          <a href={`/spawn-points/${post.spawnPointId}`}>{post.alias}</a>
          <div class="stats">
            <span>#map-maker</span>
            <span>@tester</span>
            <span>^leader</span>
            <span>(remove)</span>
          </div>
        </li>
      {/each}
    </ol>
    <Textfield type='text' bind:value={spawnPointId} label="spawn-point id" variant="outlined" style="width: 100%; color: #ccc;" />
    <div style="display: flex;">
      <Button variant="unelevated" on:click={save} color='primary' style='flex: 1; margin-top: 0.5em;'>
        <Label>Add</Label>
      </Button>
    </div>
  </Paper>
  <br />
  <div style="display: flex;">
    <Button color="secondary" href={`/stacks/${pub}`} variant="unelevated" style='flex: 1;'>
      <Label>GOTO: Stack</Label>
    </Button>
  </div>
  <br />
  <br />
  <br />
  <br />
  <br />
</div>

<script>
  import { onMount } from 'svelte';
  import Button, {Group, GroupItem, Icon} from '@smui/button';
  import GunStore from '../stores/gun';
  import Paper, {Title, Subtitle, Content} from '@smui/paper';
  import Dialog, {Actions, InitialFocus} from '@smui/dialog';
  import {Label} from '@smui/common';
  import Textfield, {Input, Textarea} from '@smui/textfield';
  
  let logoutDialog;
  let about = 'Leave a short description about anything for others to see on your profile page.';
  let gamertag = '';
  let discord = '';
  let avatar = '';
  let account = '';
  let pub = '';
  let name = 'HACKTRACKS Map Library';
  let favoriteSpawnPointId1 = '';
  let favoriteMapId1 = '';
  let favoriteSpawnPointId2 = '';
  let favoriteMapId2 = '';
  let favoriteSpawnPointId3 = '';
  let favoriteMapId3 = '';
  let favoriteSpawnPointId4 = '';
  let favoriteMapId4 = '';
  let spawnPointId = '';

	onMount(() => {
    let gun = new Gun(['https://gunjs.herokuapp.com/gun']);
    let user = gun.user();
    
    user.recall({ sessionStorage: true }, (recalled) => {
      console.log('recalled', recalled)
      account = recalled.put.alias;
      pub = recalled.put.pub;

      gun.get(pub).get('hacktracks.org').once((data, key) => {
        console.log('spawn point data: ', data)
        about = data.about || about
        gamertag = data.gamertag || ''
        discord = data.discord || ''
      });
    })

    // google analytics
    gtag('config', 'UA-161516824-1', {
      'page_path': window.location.pathname
    });
  })

  function logout() {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = '/'
  }

  function save() {
    let gun = new Gun(['https://gunjs.herokuapp.com/gun'])
    let saveCount = 0
    let saveValues = ['about', 'gamertag', 'discord', 'avatar']
    saveValues.forEach((value, key) => {
      gun.get(pub).get('hacktracks.org').get(value).put([value]).once((data, key) => {
        console.log(`new ${value} ${data}`)
        finish()
      })
    })

    function finish() {
      saveCount++
      if (saveCount === saveValues.length) {
        alert('Success, your about me info has been updated! :)')
      }
    }
  }

  const posts = [
    {
      pub: '123',
      alias: 'test',
      mapMaker: true,
      tester: true,
      lead: false,
    }
  ]
</script>
