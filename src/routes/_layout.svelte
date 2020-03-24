<svelte:window on:resize={setMiniWindow} />
<svelte:head>
  <!-- <script src="https://cdn.jsdelivr.net/npm/gun/gun.js" on:load={gunLoaded}></script>
  <script src="https://cdn.jsdelivr.net/npm/gun/sea.js" on:load={seaLoaded}></script> -->
</svelte:head>

{#if $page.path.startsWith('/demo/top-app-bar-iframe')}
  <slot></slot>
{:else}
  <TopAppBar variant="static" class="demo-top-app-bar">
    <Row>
      <Section>
          <IconButton class="material-icons" on:click={() => drawerOpen = !drawerOpen}>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path d="{mdiPound}" />
            </svg>
          </IconButton>
          <Title component={A} href="/" class="mdc-theme--secondary" style="{miniWindow ? 'padding-left: 0;' : ''}">
          <Header />
        </Title>
      </Section>
      <Section align="end" toolbar>
        {#if username}
          <IconButton href="/map-makers">
            <Icon class="mdc-theme--secondary">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="{mdiMapOutline}" />
              </svg>
            </Icon>
          </IconButton>
          <IconButton href="/platforms">
            <Icon class="mdc-theme--secondary">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="{mdiConsole}" />
              </svg>
            </Icon>
          </IconButton>
          <IconButton href="/race-gametypes">
            <Icon class="mdc-theme--secondary">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="{mdiStar}" />
              </svg>
            </Icon>
          </IconButton>
          <IconButton href={`/spawn-points/${pub}`}>
            <Icon class="mdc-theme--secondary">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="{mdiAccount}" />
              </svg>
            </Icon>
          </IconButton>
        {:else}
          <IconButton href="/map-makers">
            <Icon class="mdc-theme--secondary">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="{mdiMapOutline}" />
              </svg>
            </Icon>
          </IconButton>
          <IconButton href="/platforms">
            <Icon class="mdc-theme--secondary">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="{mdiConsole}" />
              </svg>
            </Icon>
          </IconButton>
          <IconButton href="/race-gametypes">
            <Icon class="mdc-theme--secondary">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="{mdiStar}" />
              </svg>
            </Icon>
          </IconButton>
        {/if}
      </Section>
    </Row>
  </TopAppBar>
  <div class="drawer-container">
    {#if drawerOpen}
      <Drawer variant={miniWindow ? 'modal' : null} bind:open={drawerOpen} class="demo-drawer {miniWindow ? 'demo-drawer-adjust' : ''}">
        <Content>
          <!-- <div style='margin: 1em 0.5em 0;'>
            <Textfield style='width: 100%;' variant="outlined" bind:value={searchAccounts} label="Search accounts" withTrailingIcon input$aria-controls="helper-text-shaped-outlined-c" input$aria-describedby="helper-text-shaped-outlined-c">
              <Icon class="material-icons" style='line-height: 2.3em; right: 0.5em; position: absolute;'>search</Icon>
            </Textfield>
          </div> -->
          <List>
            {#if sections}
              {#each sections as section (section.name)}
                <Item
                  bind:this={section.component}
                  href={'route' in section ? section.route : section.shortcut}
                  target={section.target || ''}
                  on:click={() => pickSection(section)}
                  activated={'route' in section && section.route === $page.path}
                  title={section.name}
                  style="{section.indent ? 'margin-left: '+(section.indent * 25)+'px;' : ''}"
                >
                  <Text class="mdc-theme--on-secondary">{section.name}</Text>
                </Item>
              {/each}
            {/if}
          </List>
          <div class="version">
            <span class="app-release">App release:</span>
            <Set chips={[`v${pkg.version}`]} let:chip>
              <Chip tabindex="0">{chip}</Chip>
            </Set>
          </div>
          <div style="display: block; position: relative; height: 200px;">
            <ATCH />
          </div>
        </Content>
      </Drawer>
    {/if}

    {#if miniWindow}
      <Scrim />
    {/if}
    <AppContent class="demo-app-content">
      <main class="demo-main-content" bind:this={mainContent}>
        <slot></slot>
      </main>
    </AppContent>
  </div>
{/if}

<script>
  import {onMount, onDestroy} from 'svelte';
  import { writable } from 'svelte/store'
  import {stores} from '@sapper/app';
  import {mdiStar, mdiConsole, mdiMapOutline, mdiAccount, mdiPound} from '@mdi/js';
  import './_app.scss';
  import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
  import Drawer, {Content, Scrim, AppContent} from '@smui/drawer';
  import Button from '@smui/button';
  import IconButton from '@smui/icon-button';
  import List, {Item, Text} from '@smui/list';
  import {Label, Icon} from '@smui/common';
  import A from '@smui/common/A.svelte';
  import Chip, {Set} from '@smui/chips';
  import pkg from '../../package.json';
	// import GunStore from '../stores/gun';
  import Textfield, {Input, Textarea} from '@smui/textfield';
  // import { boot, shutdown } from '../stores/phoenix';
  import jwt from 'jsonwebtoken';
  // import uuidv4 from 'uuid/v4';
  import Header from '../components/HACKTRACKS/Header';
	import ATCH from '../components/ATCH';

  const {page} = stores();
  let mainContent;
  let miniWindow = false;
  let drawerOpen = false;
  let mounted = false;
  let store;
  let searchAccounts = '';
  let username = '';
  let pub = '';

	onMount(() => {
    let gun = new Gun(['https://gunjs.herokuapp.com/gun']);
    let user = gun.user();
    
    sections = guestSections

		user.recall({ sessionStorage: true }, (user) => {
			console.log('welcome,', user.put.pub)
			username = user.put.alias
      pub = user.put.pub
      
      if (username) {
        sections = authSections
      }
    })
  })

  let sections;
  let authSections = [
    {
      name: 'Welcome',
      route: '/',
      indent: 0
    },
    {
      name: 'Map Makers',
      route: '/map-makers',
      indent: 1
    },
    {
      name: 'Platforms',
      route: '/platforms',
      indent: 1
    },
    {
      name: 'Race GAMETYPES',
      route: '/racetypes',
      indent: 1
    },
    {
      name: 'Chat on Discord',
      route: 'https://discord.gg/56ZxVK8',
      target: '_blank',
      indent: 0
    },
    {
      name: 'Code on Github',
      route: 'https://github.com/trabur/hacktracks',
      target: '_blank',
      indent: 0
    },
    {
      name: 'Terms & Conditions',
      route: '/terms-and-conditions',
      indent: 0
    },
    {
      name: 'Privacy Policy',
      route: '/privacy-policy',
      indent: 0
    }
  ]

  let guestSections = [
    {
      name: 'Welcome',
      route: '/',
      indent: 0
    },
    {
      name: 'Map Makers',
      route: '/map-makers',
      indent: 1
    },
    {
      name: 'Platforms',
      route: '/platforms',
      indent: 1
    },
    {
      name: 'Race GAMETYPES',
      route: '/racetypes',
      indent: 1
    },
    {
      name: 'Chat on Discord',
      route: 'https://discord.gg/56ZxVK8',
      target: '_blank',
      indent: 0
    },
    {
      name: 'Code on Github',
      route: 'https://github.com/trabur/hacktracks',
      target: '_blank',
      indent: 0
    },
    {
      name: 'Terms & Conditions',
      route: '/terms-and-conditions',
      indent: 0
    },
    {
      name: 'Privacy Policy',
      route: '/privacy-policy',
      indent: 0
    },
  ];

  onMount(setMiniWindow);
  function pickSection(section) {
    drawerOpen = false;
    mainContent.scrollTop = 0;
    // Svelte/Sapper is not updated the components correctly, so I need this.
    sections.forEach(section => section.component.$set({activated: false}));
    section.component.$set({activated: true});
  }
  function setMiniWindow() {
    miniWindow = window.innerWidth < 720;
  }
</script>