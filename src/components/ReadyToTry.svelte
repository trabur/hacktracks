
<div class="mobile only tablet only" style='padding: 0 1em; margin: 1em auto; border-top: 3px solid #111;'>
  <h2 style="color: #ccc; font-size: 1em; font-weight: 500; margin: 0;">Interested in joining HACKTRACKS? It's free!</h2>
  <p style="color: #ccc; margin: -1em 0;">ACKS IN JUST A FEW CLICKS</p>
  <br />
  {#if username}
    <Button style="width: 100%; margin: 1em 0; height: 3.6em;" href={`/accounts/${username}`} variant="unelevated" color='secondary'>MY ACCOUNT</Button>
  {:else}
    <Button style="width: 100%; margin: 1em 0; height: 3.6em;" href={`/register`} variant="unelevated" color='secondary'>SIGN UP NOW</Button>
  {/if}
</div>

<div class="mobile hidden tablet hidden" style='max-width: 900px; margin: 1em auto; border-top: 3px solid #111;'>
  {#if username}
    <Button style="float: right; margin: 1em 0; height: 3.6em;" href={`/accounts/${username}`} variant="unelevated" color='secondary'>MY ACCOUNT</Button>
  {:else}
    <Button style="float: right; margin: 1em 0; height: 3.6em;" href={`/register`} variant="unelevated" color='secondary'>SIGN UP NOW</Button>
  {/if}
  <h2 style="color: #ccc; font-size: 1.5em; font-weight: 500; margin: 0;">Interested in joining HACKTRACKS? It's free!</h2>
  <p style="color: #ccc; margin: -1em 0;">ACKS IN JUST A FEW CLICKS</p>
</div>

<script>
  import Button, {Group, GroupItem, Icon} from '@smui/button';

  export let username;
</script>