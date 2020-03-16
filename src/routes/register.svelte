<style>	
  * :global(.field) {
		margin: 0 0 1em;
		width: 100%;
	}

  .container {
		margin: 0 auto;
		padding: 1em;
		min-width: 300px;
    max-width: 300px;
	}
	
</style>

<svelte:head>
	<title>Register - FLEETGRID</title>
</svelte:head>

<div class="container">
	<Paper elevation={5}>
		<Title>Create account:</Title>
		<form on:submit|preventDefault={auth}>
			<Content>
				<div>
					<Textfield type='text' bind:value={username} label="Username" variant="outlined" style="width: 100%;" />
				</div>
				<br />
				<div>
					<Textfield type='password' bind:value={password} label="Password" variant="outlined" style="width: 100%;" />
				</div>
				<br />
				<div>
					<Textfield type='password' bind:value={passwordConfirm} label="Confirm Password" variant="outlined" style="width: 100%;" />
				</div>
				<br />
				<FormField align="start">
					<Checkbox bind:checked={agreement} />
					<span slot="label" style="color: #111;">I agree to the <a href='/privacy-policy'>Privacy Policy</a> and <a href='/terms-and-conditions'>Terms & Conditions</a>.</span>
				</FormField>
			</Content>
			<br />
			<Button type='submit' variant="unelevated"><Label>Submit</Label></Button>
		</form>
	</Paper>
	<p style="text-align: center; color: #ccc;">-or-</p>
	<Group variant="outlined" style="display: flex; margin-bottom: 1em;">
		<Button variant="outlined" href="/login" style="flex-grow: 1;"><Label>LOGIN</Label></Button>
	</Group>
</div>

<script>
	import { onMount, onDestroy } from 'svelte';
  import Paper, {Title, Subtitle, Content} from '@smui/paper';
  import Textfield, {Input, Textarea} from '@smui/textfield';
  import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';
	import Button, {Group, GroupItem, Label, Icon} from '@smui/button';
  // import { begin, start, broadcast, register, shutdown } from '../stores/phoenix';
  import uuidv4 from 'uuid/v4';
	
  let agreement = false;
	let username = '';
	let password = '';
	let passwordConfirm = '';
  let socket;
  let channel;
	let roomId = uuidv4();

	onMount(() => {
    // socket = begin()
    // channel = start(socket, roomId)
  })

  // onDestroy(() => shutdown(socket, channel, roomId))

	function auth() {
		if (password !== passwordConfirm) {
			return alert('Passwords do not match.')
		}
		if (!agreement) {
			return alert('Agreement must be checked.')
		}
		// register(channel, roomId, username, password)
	}
</script>
