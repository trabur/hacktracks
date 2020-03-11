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
        <IconButton class="material-icons" on:click={() => drawerOpen = !drawerOpen}>menu</IconButton>
        <Title component={A} href="/" class="mdc-theme--secondary" style="{miniWindow ? 'padding-left: 0;' : ''}">
          <Header />
        </Title>
      </Section>
      <Section align="end" toolbar>
        {#if username}
          <IconButton href="https://github.com/hperrin/svelte-material-ui">
            <Icon class="mdc-theme--secondary">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="{mdiMapOutline}" />
              </svg>
            </Icon>
          </IconButton>
          <IconButton href="https://github.com/hperrin/svelte-material-ui">
            <Icon class="mdc-theme--secondary">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="{mdiVideoVintage}" />
              </svg>
            </Icon>
          </IconButton>
          <IconButton href="https://github.com/hperrin/svelte-material-ui">
            <Icon class="mdc-theme--secondary">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="{mdiStar}" />
              </svg>
            </Icon>
          </IconButton>
        {:else}
          <IconButton href="https://github.com/hperrin/svelte-material-ui">
            <Icon class="mdc-theme--secondary">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="{mdiMapOutline}" />
              </svg>
            </Icon>
          </IconButton>
          <IconButton href="https://github.com/hperrin/svelte-material-ui">
            <Icon class="mdc-theme--secondary">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="{mdiVideoVintage}" />
              </svg>
            </Icon>
          </IconButton>
          <IconButton href="https://github.com/hperrin/svelte-material-ui">
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
  import {mdiStar, mdiVideoVintage, mdiMapOutline} from '@mdi/js';
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
  import Header from '../components/HACKTRACKS/Header'

  const {page} = stores();
  let mainContent;
  let miniWindow = false;
  let drawerOpen = false;
  let mounted = false;
  let store;
  let searchAccounts = '';
  let username;


	onMount(() => {
    let token = localStorage.getItem('token')
    if (token) {
      let decoded = jwt.decode(token)
      username = decoded.username
      console.log('username:', username)
    }

    if (username) {
      sections = authSections
      sections[1].route = `/accounts/${username}`
      setInterval(() => {
        // companyId is set during loading of field service -> companies
        let companyId = localStorage.getItem('companyId')
        if (companyId) {
          // set authSections
          sections[3].route = `/field-service/companies/${companyId}`
        }
      }, 1000);
    } else {
      sections = guestSections
    }

    // boot(uuidv4()) // starts a random room
    // onDestroy(() => shutdown())
  })

  let sections;
  let authSections = [
    {
      name: 'Video Games',
      route: '/',
      indent: 0
    },
    {
      name: 'Halo 3',
      route: '/games/halo-3',
      indent: 1
    },
    {
      name: 'Halo Reach',
      route: '/games/halo-reach',
      indent: 1
    },
    {
      name: 'Chat on Discord',
      route: 'https://discordapp.com/channels/663882734438973471/663882735521234957',
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
      name: 'Video Games',
      route: '/',
      indent: 0
    },
    {
      name: 'Halo 3',
      route: '/games/halo-3',
      indent: 1
    },
    {
      name: 'Halo Reach',
      route: '/games/halo-reach',
      indent: 1
    },
    {
      name: 'Chat on Discord',
      route: 'https://discordapp.com/channels/663882734438973471/663882735521234957',
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