<style>
  .container {
		margin: 0 auto;
		padding: 1em;
		min-width: 300px;
    max-width: 600px;
  }
</style>

<svelte:head>
  <title>Settings - FLEETGRID</title>
</svelte:head>

<div class="container">
  <h4 style="color: #ccc;">Settings</h4>
  <Paper color="primary" elevation={4}>
    <Title>Log out</Title>
    <Content>You cannot log in back to this account unless you have saved a backup of your username and password.</Content>
    <br />
    <Button on:click={() => logoutDialog.open()} style='background: #fff;'>Log out</Button>
    <Dialog bind:this={logoutDialog} style='color: #111;'>
      <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
      <Title style='padding: 0.5em 0.5em 0;'>Are you sure?</Title>
      <Content style='padding: 0 0.5em;'>
        <p>This account's username and password will be<br /> needed in order to return.</p>
      </Content>
      <Actions>
        <Button on:click={() => logoutDialog.close()}>
          <Label>Cancel</Label>
        </Button>
        <Button on:click={() => logout()} variant="outlined">
          <Label>Yes</Label>
        </Button>
      </Actions>
    </Dialog>
  </Paper>
  <br />
  <br />
  <Paper elevation={4}>
    <Title>About {account}:</Title>
    <!-- <Content>Leave a short description about anything for others to see on your profile page.</Content> -->
    <div>
      <Textarea type='text' bind:value={about} label="about" variant="outlined" style="width: 100%;" />
    </div>
    <br />
    <div>
      <Textfield type='text' bind:value={gamertag} label="gamertag" variant="outlined" style="width: 100%;" />
    </div>
    <br />
    <div>
      <Textfield type='text' bind:value={discord} label="discord" variant="outlined" style="width: 100%;" />
    </div>
    <br />
    <Button variant="unelevated" on:click={save} color='secondary' style='margin-top: 0.5em;'>
      <Label>Save</Label>
    </Button>
  </Paper>
  <br />
  <Button href='/terms-and-conditions' variant="unelevated" style='margin-top: 0.5em;'>
    <Label>Terms & Conditions</Label>
  </Button>
  <Button href='/privacy-policy' variant="unelevated" style='margin-top: 0.5em;'>
    <Label>Privacy Policy</Label>
  </Button>
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
  let account = '';
  let pub = '';

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
  })

  function logout() {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = '/'
  }

  function save() {
    let gun = new Gun(['https://gunjs.herokuapp.com/gun']);

    gun.get(pub).get('hacktracks.org').get('about').put(about).once((data, key) => {
      console.log('new about', data)
    })

    gun.get(pub).get('hacktracks.org').get('gamertag').put(gamertag).once((data, key) => {
      console.log('new gamertag', data)
    })

    gun.get(pub).get('hacktracks.org').get('discord').put(discord).once((data, key) => {
      console.log('new discord', data)
    })
  }
</script>