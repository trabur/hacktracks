<svelte:head>
	<title>>>>----------[} HACKTRACKS - HT</title>
</svelte:head>

<div style="height: 100%; width: 100%;">
	<div style="box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); background: url('/reach.jpg'); height: 500px; background-position: 50% 50%; background-size: cover;"></div>
	<div style="max-width: 900px; margin: 2em auto 5em;">
		<h1 style="font-weight: 700; margin: 0.5em 0; text-shadow: 0 0 0.4em #000; color: #eee; font-size: 2em; padding: 0 0.5em; line-height: 1em; text-align: left; text-transform: none;">
			From Ideas. To Checkpoints. With Forge.
		</h1>
		<Options />
		<Favorites />
		<div style="margin: 1em 0; display: flex;">
			<MostKudos />
			<MostRecent />
		</div>
		<SourceCode />
    <ReadyToTry username={username} pub={pub} />
	</div>
</div>


<script>
	import { onMount, onDestroy } from 'svelte';
  import Paper, {Title, Subtitle, Content} from '@smui/paper';
  import {Label, Icon} from '@smui/common';
	import {mdiConsoleLine} from '@mdi/js';
  import Button, {Group, GroupItem} from '@smui/button';
	import ReadyToTry from '../components/ReadyToTry';
	import Options from '../components/HACKTRACKS/Options';
	import Favorites from '../components/HACKTRACKS/Favorites';
	import MostKudos from '../components/HACKTRACKS/MostKudos';
	import MostRecent from '../components/HACKTRACKS/MostRecent';
	import SourceCode from '../components/SourceCode';

	let username = null;
	let pub = null;
	let race = "{ acknologing checkpoints within recursive enviornments }";
	let hat = "{ puts on a sort of cheaters hat }";
	let test = "() <--- test";
	let mask = "{} <--- mask";
	let check = "[] <--- check";
	let push = "{ push pedal bike }";
	let clipped = "{ clipped pedal bike }";
	let up = "<---";
	let math = "{ 1 + 1 = 2 }";
	let fun = "built (tested) { <and>raced simultaneously</and> }";
	let lookForward = "<";
	let pacman = "PAC-MAN";
	let gc = "{ <p>running around C>L>E>A>N>I>N>G up the script</p> }";
	let script = `This eye + eye + ... well, science leaves nothing but circular logic ----> ... make, test, repeat ... make, test, repeat ... ----> therefor math or "m" at "h" will be used. As you can see, with every new era, somethings will work and somethings will break. Therefor terms such as "look-forward" and "look-backward" || "{lookForward}" and ">" statements and #brakes are a "forgers" tools of the trade; Here's The Thing: understanding HT's Temperature/Pressure is like trying to get a dregree in something beyond rocket science "\_(*_*)_/" now here is a simple garbadge collector ({pacman}) {gc}.`;

	onMount(() => {
    let gun = new Gun(['https://gunjs.herokuapp.com/gun']);
		let user = gun.user();
		user.recall({ sessionStorage: true }, (user) => {
			console.log('hello,', user.put.alias)
			console.log(user)
			username = user.put.alias
			pub = user.put.pub
		})

    // google analytics
    gtag('config', 'UA-161516824-1', {
      'page_path': window.location.pathname
    });
	})
</script>