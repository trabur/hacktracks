
<div style='display: flex;' class="mobile hidden">
  <Paper elevation={3} style='margin: 1em auto; max-width: 300px;'>
    <Content>
      <h3 style='font-size: 1.5em; margin: 0; font-weight: bold;'>FEATURED STACK</h3>
      <p style='margin: 0;'>
        <strong>Stacks are simple {stack}</strong>, these allow members to run their own organizations within HT.
      </p>
      <Button href={`/stacks/${npmPackage.config.featuredStack}`} variant='outlined' color='primary' style='width: 100%; margin-top: 1em;'>browse</Button>
    </Content>
  </Paper>
  <div style="width: 1em;"></div>
  <Paper elevation={3} style='margin: 1em auto; max-width: 300px;'>
    <h3 style='font-size: 1.5em; margin: 0; font-weight: bold;'>PLATFORMS</h3>
    <p style='margin: 0;'>
      <strong>Mostly Halo 3 and Halo Reach</strong>, for the time being only consoles are supported (xbox); support for PC is coming soon.
    </p>
    <Button href='/platforms' variant='outlined' color='primary' style='width: 100%; margin-top: 1em;'>view</Button>
  </Paper>
  <div style="width: 1em;"></div>
  <Paper elevation={3} style='margin: 1em auto; max-width: 300px;'>
    <h3 style='font-size: 1.5em; margin: 0; font-weight: bold;'>RACE GAMETYPES</h3>
    <p style='margin: 0;'>
      <strong>The #1</strong>, most downloaded gametype: RACETRACKS! Includes spin-offs SUMOHOGS, BATTLETRACKS, etc...
    </p>
    <Button href='/race-gametypes' variant='outlined' color='primary' style='width: 100%; margin-top: 1em;'>checkout</Button>
  </Paper>
</div>

<script>
  import Paper, {Title, Subtitle, Content} from '@smui/paper';
  import Button, {Group, GroupItem} from '@smui/button';
	import npmPackage from '../../../package.json';

  let stack = `ack(st){supervisor-tree}`;
</script>