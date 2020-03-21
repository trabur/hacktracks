
<script context="module">
	export async function preload(page, session) {
		const { slug } = page.params;
		return { slug };
	}
</script>

<svelte:head>
  <title>{username || 'Spawn Point'} - HACKTRACKS - HT</title>
</svelte:head>

<div style='width: 100%; overflow-x: hidden;'>
  <div class="grid" style='height: 500px; max-width: 100%;'>
    <div style={`height: 500px; background-image: url(${coverPhoto}); background-position: top center; background-size: cover; background-repeat: no-repeat;`}>
    </div>
  </div>
  <div class="top-app-bar-container flexor">
    <TopAppBar class="demo-contact-app-bar" variant="static" {prominent} {dense} color={secondaryColor ? 'secondary' : 'primary'}>
      <Row style='max-width: 900px; margin: 0 auto;'>
        <div class='mobile hidden tablet hidden computer hidden' style='flex: none !important; max-width: 244px; padding: 1em;'>
          {#if profilePhoto}
            <a href={`/accounts/${username}`} style='height: 100%;'>
              <img alt='profile' src={`${profilePhoto}`} style='height: 204px; margin: -4em 0; border-radius: 0.5em; border: 4px solid #000; width: 204px;' />
            </a>
          {:else}
            <img alt='profile' src={`data:image/png;base64,${identicon}`} style='height: 204px; margin: -4em 0; border-radius: 0.5em; border: 4px solid #000; width: 204px;' />
          {/if}
        </div>
        <div class='mobile only tablet only' style='width: 1em;'></div>
        <div style='flex: 1; flex-direction: column; position: relative; width: 100%;'>
          <div style='margin: 1em 0 0; position: absolute; top: 0; left: 0; right: 0;'>
            <Button variant="unelevated">
              <Icon>
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path d="{mdiQrcode}" />
                </svg>
              </Icon>
              <Label>Share</Label>
            </Button>
            <Button variant="unelevated" href={`/chats/keyID/${slug}`}>
              <Icon>
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path d="{mdiChat}" />
                </svg>
              </Icon>
              <Label>Chat</Label>
            </Button>
            <Button variant="unelevated" style='float: right;'>
              <Label>GAMERTAG</Label>
            </Button>
          </div>
          <TabBar tabs={navigation} let:tab bind:active style='margin: 0px; bottom: 0; position: absolute;'>
            <Tab {tab} minWidth>
              {#if tab === 'Maps'}
                <Label>{tab} [{mapsCount}]</Label>
              {/if}
              {#if tab === 'Kudos :)'}
                <Label>{tab} [{kudosCount}]</Label>
              {/if}
            </Tab>
          </TabBar>
        </div>
        <div class='mobile only tablet only' style='width: 1em;'></div>
      </Row>
    </TopAppBar>
    <div class="flexor-content" style='max-width: 900px; margin: 0 auto; display: flex;'>
      <div class='mobile hidden tablet hidden computer hidden' style='min-width: 244px; max-width: 244px; margin-bottom: 4em;'>
        <div style='padding: 3em 1em 0;'>
          <div style='width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'>
            <!-- {#if trustDistanceName}
              <span class='label label-default' style='float: right; margin: 0;'>{trustDistanceName}</span>
            {/if} -->
            <span style='font-size: 1.5em; font-weight: 900; color: #ccc;'>{username}</span>
          </div>
          <Paper color="primary" style='margin-top: 1em;'>
            <Content>
              <p style='margin: 0;'>{about}</p>
            </Content>
          </Paper>
          {#if account === username}
            <br />
            <Group style='display: flex;'>
              <Button href="/settings" style='flex-grow: 1;' color='secondary' variant="unelevated">
                Settings
              </Button>
            </Group>
          {/if}
        </div>
      </div>
      <div style='width: 100%; position: relative; max-width: 100%;'>
        <div style='width: 100%; position: absolute; top: 0;'>
          <br class='mobile hidden tablet hidden' />
          {#if active === 'Maps'}
            {#each maps as map}
              <Paper elevation={5} style='padding: 0;'>
                <p>{map.name}</p>
              </Paper>
            {/each}
            <NewMap slug={slug} account={account} username={username} />
          {/if}
          {#if active === 'Kudos :)'}
            <!-- {#each received as r}
              <div style='border-bottom: 1px solid #ccc; padding: 1em;'>
                {#if r.type === 'post'}
                  <p>{r.text}</p>
                {:else if r.type === 'rating'}
                  <p>{r.text}</p>
                {:else if r.type === 'verification'}
                  {#each Object.keys(r.recipient) as key}
                    <p><strong>{key}</strong>: {r.recipient[key]}</p>
                  {/each}
                {/if}
              </div>
            {/each} -->
          {/if}
          <br class='mobile hidden tablet hidden' />
          <br class='mobile hidden tablet hidden' />
          <br class='mobile hidden tablet hidden' />
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  import { onMount } from 'svelte';
  import Button, {Group, GroupItem, Icon} from '@smui/button';
  import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import Tab, {Label} from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import {mdiQrcode, mdiShare, mdiChat, mdiLink, mdiKey, mdiAccount, mdiCheck, mdiClose} from '@mdi/js';
  import Identicon from 'identicon.js';
  import Paper, {Subtitle, Content} from '@smui/paper';
  import Chip, {Set, Checkmark, Text} from '@smui/chips';
  import List, {Item, Graphic, Meta, Separator, Subheader, PrimaryText, SecondaryText} from '@smui/list';
  import sha256 from 'js-sha256'
  import NewMap from '../../components/NewMap'
  
  export let slug;
  let username = '';
  let account = 'HT';
  let profilePhoto;
  let authentication;
  let contact;
  let prominent = true;
  let dense = false;
  let secondaryColor = true;
  let coverPhoto = './master-chief.jpg'
  let identicon = new Identicon(sha256(slug), 420).toString();
  let navigation = ['Maps', 'Kudos :)']
  let mapsCount = 0
  let kudosCount = 0
  let active = 'Maps'
  let maps = [];
  let about = '';

	onMount(() => {
    let gun = new Gun(['https://gunjs.herokuapp.com/gun']);
    let user = gun.user();
    
    user.recall({ sessionStorage: true }, (recalled) => {
      console.log('recalled', recalled)
      account = recalled.put.alias;
    })

    gun.user(slug).once((data, key) => {
      console.log('spawn point data: ', data)
			username = data.alias
    });
    
    gun.get(slug).get('hacktracks.org').once((data, key) => {
      console.log('user', data)
      about = data.about
    })

    let r = [];
    gun.get(slug).get('hacktracks.org').get('maps').map().on((data, key) => {
      r = r.filter((value, index) => {
        return value._['#'] !== key
      })
      if (data === null) { // data was removed
        console.log('ht maps', key)
      } else if (data) { // data was added / updated
        console.log('ht maps', data)
        r = [data, ...r]
      }
      maps = r
    })
	})

</script>