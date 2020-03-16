<style>	
  * :global(.field) {
		margin: 0 0 1em;
		width: 100%;
	}

  .container {
		margin: 0 auto;
		padding: 1em;
		min-width: 300px;
    max-width: 600px;
	}
</style>

<svelte:head>
	<title>Login - FLEETGRID</title>
</svelte:head>

<div class="container">
	<Paper elevation={5}>
		<Title>Existing account:</Title>
		<form on:submit|preventDefault={auth}>
			<Content>
				<div>
					<Textfield type='text' bind:value={username} label="Username" variant="outlined" style="width: 100%;" />
				</div>
				<br />
				<div>
					<Textfield type='password' bind:value={password} label="Password" variant="outlined" style="width: 100%;" />
				</div>
			</Content>
			<br />
			<Button type='submit' variant="unelevated"><Label>Submit</Label></Button>
			<!-- <Button type='button' on:click={() => {lostYourKey = !lostYourKey}} style='float: right;'><Label>Lost your key?</Label></Button> -->
			<!-- {#if lostYourKey}
				<Paper color="primary" style='margin-top: 1em;'>
					<Content>Don't worry: just go with "Register" and ask your trusted contacts to verify that your new key belongs to the already existing identity.</Content>
				</Paper>
			{/if} -->
		</form>
	</Paper>
	<p style="text-align: center; color: #ccc;">-or-</p>
	<Group variant="outlined" style="display: flex; margin-bottom: 1em;">
		<Button variant="outlined" href="/register" style="flex-grow: 1;"><Label>REGISTER</Label></Button>
	</Group>
</div>

<script>
	import { onMount, onDestroy } from 'svelte';
  import Paper, {Title, Subtitle, Content} from '@smui/paper';
  import Textfield, {Input, Textarea} from '@smui/textfield';
	import Button, {Group, GroupItem, Label, Icon} from '@smui/button';
  // import { begin, start, broadcast, login, shutdown } from '../stores/phoenix';
  import uuidv4 from 'uuid/v4';
	
	let username = '';
	let password = '';
	let lostYourKey = false;
  let socket;
  let channel;
	let roomId = uuidv4();

	onMount(() => {
    // socket = begin()
    // channel = start(socket, roomId)
  })

  // onDestroy(() => shutdown(socket, channel, roomId))
	
	function auth() {
		// login(channel, roomId, username, password)
	}
</script>
