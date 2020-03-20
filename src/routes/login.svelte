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
	<title>Login - HACKTRACKS - HT</title>
</svelte:head>

<div class="container">
	<div style="display: block; position: relative; height: 200px;">
		<ATCH />
	</div>
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
	import ATCH from '../components/ATCH';
	
	let username = '';
	let password = '';
	let lostYourKey = false;

	function auth() {
    let gun = new Gun(['https://gunjs.herokuapp.com/gun']);
    let user = gun.user();
		user.auth(username, password, (ack) => {
			console.log('ack', ack)
			if (ack.err) {
				// on failure callback is called cb(ack) where ack is as below
				// {
				//     err: 'Wrong user or password.'
				// }
				alert(ack.err)
			} else {
				// on success calls callback with a reference to the gun user
				console.log('success')
				user.recall({ sessionStorage: true })
				window.location.href = '/'
			}
		})
	}
</script>
