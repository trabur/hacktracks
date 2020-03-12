<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>
<Button on:click={() => console.log('test')} href='https://fleetgrid.com' variant='outlined' color='primary' style='width: 100%; margin-top: 1em;'>fleetgrid.com</Button>


<script>
	import Button, {Group, GroupItem} from '@smui/button';
</script>