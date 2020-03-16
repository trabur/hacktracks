
<script context="module">
	export async function preload(page, session) {
		const { slug } = page.params;
		return { slug };
	}
</script>

<svelte:head>
  <title>Spawn Point - HACKTRACKS - HT</title>
</svelte:head>

<div style='width: 100%; overflow-x: hidden;'>
  <div class="grid" style='height: 350px; max-width: 100%;'>
    <div style={`height: 350px; background-image: url(${coverPhoto}); background-position: 50% 50%; background-size: cover; background-repeat: no-repeat;`}>
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
            <Button variant="unelevated" href={`/chats/keyID/${slug}`} style='float: right;'>
              <Icon>
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path d="{mdiShare}" />
                </svg>
              </Icon>
              <Label>Follow</Label>
            </Button>
          </div>
          <TabBar tabs={navigation} let:tab bind:active style='margin: 0px; bottom: 0; position: absolute;'>
            <Tab {tab} minWidth>
              {#if tab === 'Maps'}
                <Label>{tab} [{identityCount}]</Label>
              {/if}
              {#if tab === 'Kudos :)'}
                <Label>{tab} [{receivedCount}]</Label>
              {/if}
              {#if tab === 'Kudos (:'}
                <Label>{tab} [{sentCount}]</Label>
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
            <span style='font-size: 1.5em; font-weight: 900;'>{slug}</span>
          </div>
          <Paper color="primary" style='margin-top: 1em;'>
            <Content>
              <p style='margin: 0;'>Filter(s):</p>
              <br />
              <Group style='display: flex; margin-bottom: 0.5em;'>
                <Button style='flex-grow: 1; min-width: 30px;' color='secondary' variant="unelevated">
                  <Label>✕</Label>
                </Button>
                <Button style='background: #fff; flex-grow: 1; min-width: 30px;'>
                  <Label>1</Label>
                </Button>
                <Button style='background: #fff; flex-grow: 1; min-width: 30px;'>
                  <Label>2</Label>
                </Button>
              </Group>
              <Group style='display: flex; margin-bottom: 0.5em;'>
                <Button style='background: #fff; flex-grow: 1; min-width: 30px;'>
                  <Label>3</Label>
                </Button>
                <Button style='background: #fff; flex-grow: 1; min-width: 30px;'>
                  <Label>4</Label>
                </Button>
                <Button style='background: #fff; flex-grow: 1; min-width: 30px;'>
                  <Label>∞</Label>
                </Button>
              </Group>
            </Content>
          </Paper>
          {#if slug === username}
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
          <Paper elevation={5} style='padding: 0;'>
            {#if active === 'Kudos :)'}
              {#each received as r}
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
              {/each}
            {/if}
            {#if active === 'Kudos (:'}
              <!-- {#each sent as s}
                <div style='border-bottom: 1px solid #ccc; padding: 1em;'>
                  {#if s.type === 'post'}
                    <p>{s.text}</p>
                  {:else if s.type === 'rating'}
                    <p>{s.text}</p>
                  {:else if s.type === 'verification'}
                    {#each Object.keys(s.recipient) as key}
                      <p><strong>{key}</strong>: {s.recipient[key]}</p>
                    {/each}
                  {/if}
                </div>
              {/each} -->
            {/if}
            {#if active === 'Maps'}
              <List class="demo-list" twoLine avatarList singleSelection bind:selectedIndex={selectionIndex}>
                <!-- {#each identities as identity}
                  <Item on:SMUI:action={() => selectionTwoLine = identity.name}>
                    {#if identity.type === 'name'}
                      <Graphic>
                        <Button href={`/contacts/${identity.type}/${encodeURIComponent(identity.value)}`}>
                          <Icon style='margin: 0 auto; color: #111;'>
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                              <path d="{mdiAccount}" />
                            </svg>
                          </Icon>
                        </Button>
                      </Graphic>
                    {:else if identity.type === 'keyID'}
                      <Graphic>
                        <Button href={`/contacts/${identity.type}/${encodeURIComponent(identity.value)}`}>
                          <Icon style='margin: 0 auto; color: #111;'>
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                              <path d="{mdiKey}" />
                            </svg>
                          </Icon>
                        </Button>
                      </Graphic>
                    {:else}
                      <Graphic>
                        <Button href={`/contacts/${identity.type}/${encodeURIComponent(identity.value)}`}>
                          <Icon style='margin: 0 auto; color: #111;'>
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                              <path d="{mdiLink}" />
                            </svg>
                          </Icon>
                        </Button>
                      </Graphic>
                    {/if}
                    <Text>
                      <PrimaryText style='color: #111; margin: -1em 0;'>{identity.value}</PrimaryText>
                      <SecondaryText style='color: #888;'>{identity.type}</SecondaryText>
                    </Text>
                    <Meta style='position: absolute; right: 1em; z-index: 1;'>
                      <Group style='display: flex; margin-bottom: 0.5em;'>
                        <Button style='flex-grow: 1; min-width: 10px;' variant="unelevated" color="secondary">
                          <Icon style='display: flex; margin: 0 auto;'>
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                              <path d="{mdiCheck}" />
                            </svg>
                          </Icon>
                          {identity.verifications}
                        </Button>
                        <Button style='flex-grow: 1; min-width: 10px;' variant="unelevated" color="secondary">
                          <Icon style='display: flex; margin: 0 auto;'>
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                              <path d="{mdiClose}" />
                            </svg>
                          </Icon>
                          {identity.unverifications ? identity.unverifications : ''}
                        </Button>
                      </Group>
                    </Meta>
                  </Item>
                {/each} -->
              </List>
            {/if}
          </Paper>
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
  
  export let slug;
  let username = ''


  let profilePhoto;
  let authentication;
  let contact;
  let prominent = true;
  let dense = false;
  let secondaryColor = true;
  let coverPhoto = './reach.jpg'
  let identicon = new Identicon(sha256(slug), 420).toString();
  let trustDistanceName = null
  let navigation = ['Maps', 'Kudos :)', 'Kudos (:']
  let receivedCount = 0
  let sentCount = 0
  let identityCount = 0
  let identities = []
  let sent = []
  let received = []
  let active = 'Maps'
  let selectionIndex = null;
  let selectionTwoLine;

</script>