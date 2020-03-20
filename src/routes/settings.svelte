<style>

  .container {
		margin: 0 auto;
		padding: 1em;
		min-width: 300px;
    max-width: 600px;
  }
  
  #qrcode {
    width: 100%;
    height: 100%;
    margin-top: 1em;
  }
</style>

<svelte:head>
  <title>Settings - FLEETGRID</title>
</svelte:head>

<div class="container">
  <h4 style="color: #ccc;">Settings</h4>
  <!-- <p>settings {JSON.stringify(authentication, null, 2)}</p> -->
  <Paper color="primary" elevation={4}>
    <Title>Log out</Title>
    <Content>You cannot log in back to this account unless you have saved a backup of your username and password or unless you have filled out the contact information below.</Content>
    <br />
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
    <Title>About me</Title>
    <Content>Leave a short description about anything for others to see on your profile page.</Content>
    <br />
    <Dialog bind:this={qrDialog} aria-labelledby="simple-title" aria-describedby="simple-content">
      <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
      <Title style='padding: 0.5em 0.5em 0;'>Private key</Title>
      <Content style='padding: 0 0.5em;'>
        <div id="qrcode"></div>
      </Content>
      <Actions>
        <Button on:click={() => qrDialog.close()}>
          <Label>Got it</Label>
        </Button>
      </Actions>
    </Dialog>
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
  
  let authentication;
  let qrDialog;
  let logoutDialog;

	onMount(() => {
		let script = document.createElement('script');
    script.src = "https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"
    document.head.append(script);
  })

  function logout() {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = '/'
  }

  const copyToClipBoard = () => {
    const el = document.createElement('textarea');
    el.value = JSON.stringify(authentication.identity.index.options.keypair, null, 2);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Copied private key to clipboard.')
  };
  
  let qrcode = false;
  let qr;
  function showQRCode() {
    if (qr) return;
    qr = new QRCode("qrcode", {
      text: JSON.stringify(authentication.identity.index.options.keypair, null, 2),
      width: 300,
      height: 300,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
    qrcode = !qrcode
  };

  function exportToJsonFile() {
    let dataStr = JSON.stringify(authentication.identity.index.options.keypair, null, 2);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'fleetgrid-private-key.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
</script>