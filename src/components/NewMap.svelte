
{#if account === username}
  <div class="mobile only tablet only" style='padding: 0 1em; margin: 1em auto 5em; border-top: 3px solid #111;'>
    <Button style="width: 100%; margin: 1em 0; height: 3.6em;" on:click={() => createDialog.open()} variant="unelevated" color='secondary'>ADD MAP</Button>
  </div>
  <div class="mobile hidden tablet hidden" style='max-width: 900px; margin: 1em auto 5em; border-top: 3px solid #111;'>
    <Button style="float: right; margin: 1em 0; height: 3.6em;" on:click={() => createDialog.open()} variant="unelevated" color='secondary'>ADD MAP</Button>
  </div>
{:else}
  <!---->
{/if}

<Dialog bind:this={createDialog} style='color: #111;'>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title style='padding: 0.5em 0.5em 0;'>Map database:</Title>
  <Content style='padding: 0 0.5em;'>
    <div>
      <Textfield type='text' bind:value={name} label="Name" variant="outlined" style="width: 100%;" />
    </div>
  </Content>
  <Actions>
    <Button on:click={() => createDialog.close()}>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={() => create()} variant="outlined">
      <Label>Create</Label>
    </Button>
  </Actions>
</Dialog>

<script>
  import Button, {Group, GroupItem, Icon} from '@smui/button';
  import Dialog, {Actions, InitialFocus} from '@smui/dialog';
  import Paper, {Title, Subtitle, Content} from '@smui/paper';
  import {Label} from '@smui/common';
  import Textfield, {Input, Textarea} from '@smui/textfield';

  let createDialog;
  export let username;
  export let account;
  export let slug;
  let name = '';

  function create() {
    let gun = new Gun(['https://gunjs.herokuapp.com/gun']);
    let user = gun.user();

    let now = new Date()
    let record = {
      name: name,
      createdAt: now.toISOString()
    }

    gun.get(slug).get('hacktracks.org').get('maps').set(record).once((data, key) => {
      console.log('data', data)
    })
  }

</script>