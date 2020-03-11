
<div style='max-width: 900px; margin: 0 auto; padding: 2em 0 1em;'>
  <Paper style='' elevation={3} color="primary">
    <h1 class='mobile only' style='font-size: 2em; text-align: center; margin: 1em 0; line-height: 1.5em;'>Simple Fleet Management</h1>
    <h1 class='tablet only' style='font-size: 3em; text-align: center; margin: 0;'>Simple Fleet Management</h1>
    <h1 class='tablet hidden mobile hidden' style='font-size: 4em; text-align: center; margin: 0;'>Simple Fleet Management</h1>
    <h6 style='margin: -1em 0 1em; text-align: center;'>(For Companies)</h6>
    <div style='display: flex;'>
      <div style='flex: 1; max-width: 50%;'>
        <Icon class="mdc-theme--secondary">
          <svg style=" width: 40%; display: flex; margin: 0 auto; filter: invert(100%);" viewBox="0 0 24 24">
            <path d="{mdiEarth}" />
          </svg>
        </Icon>
        <p style='margin: 0 1em 1em; text-align: center;'>Track any fleet of vehicles, assets, or people anywhere around the world.</p>
      </div>
      <div style='flex: 1; max-width: 50%;'>
        <Icon class="mdc-theme--secondary">
          <svg style=" width: 40%; display: flex; margin: 0 auto; filter: invert(100%);" viewBox="0 0 24 24">
            <path d="{mdiVectorPoint}" />
          </svg>
        </Icon>
        <p style='margin: 0 1em 1em; text-align: center;'>Access to shortest path algorithms such as Dijkstra and A* for optimal routing.</p>
      </div>
      <div class="mobile hidden" style='flex: 1; max-width: 50%;'>
        <Icon class="mdc-theme--secondary">
          <svg style=" width: 40%; display: flex; margin: 0 auto; filter: invert(100%);" viewBox="0 0 24 24">
            <path d="{mdiTrafficLight}" />
          </svg>
        </Icon>
        <p style='margin: 0 1em 1em; text-align: center;'>Automatically analyze traffic data for faster routes through the grid.</p>
      </div>
    </div>
    <div style='display: flex;' class="mobile only">
      <!-- the following two divs are clones for mobile only -->
      <div style='flex: 1; max-width: 50%;'>
        <Icon class="mdc-theme--secondary">
          <svg style=" width: 40%; display: flex; margin: 0 auto; filter: invert(100%);" viewBox="0 0 24 24">
            <path d="{mdiTrafficLight}" />
          </svg>
        </Icon>
        <p style='margin: 0 1em 1em; text-align: center;'>Automatically analyze traffic data for faster routes through the grid.</p>
      </div>
      <div style='flex: 1; max-width: 50%;'>
        <Icon class="mdc-theme--secondary">
          <svg style=" width: 40%; display: flex; margin: 0 auto; filter: invert(100%);" viewBox="0 0 24 24">
            <path d="{mdiPuzzle}" />
          </svg>
        </Icon>
        <p style='margin: 0 1em 1em; text-align: center;'>Integrates well with other web APIs such as Stripe, QuickBooks, JavaScript, etc...</p>
      </div>
    </div>
    <div style='display: flex;'>
      <div style='flex: 1; max-width: 50%;'>
        <Icon class="mdc-theme--secondary">
          <svg style=" width: 40%; display: flex; margin: 0 auto; filter: invert(100%);" viewBox="0 0 24 24">
            <path d="{mdiDevices}" />
          </svg>
        </Icon>
        <p style='margin: 0 1em 1em; text-align: center;'>Application is available on all devices — mobile, desktop, and browser.</p>
      </div>
      <div style='flex: 1; max-width: 50%;'>
        <Icon class="mdc-theme--secondary">
          <svg style=" width: 40%; display: flex; margin: 0 auto; filter: invert(100%);" viewBox="0 0 24 24">
            <path d="{mdiChat}" />
          </svg>
        </Icon>
        <p style='margin: 0 1em 1em; text-align: center;'>Messaging is built around channels so communication stays simple.</p>
      </div>
      <div class="mobile hidden" style='flex: 1;'>
        <Icon class="mdc-theme--secondary">
          <svg style=" width: 40%; display: flex; margin: 0 auto; filter: invert(100%);" viewBox="0 0 24 24">
            <path d="{mdiPuzzle}" />
          </svg>
        </Icon>
        <p style='margin: 0 1em 1em; text-align: center;'>Integrates well with other web APIs such as Stripe, QuickBooks, JavaScript, etc...</p>
      </div>
    </div>
    <div style='text-align: center;'>
      <Button href='/welcome' variant="unelevated" color='secondary'>GET STARTED</Button>
    </div>
  </Paper>
</div>

<script>
  import Paper, {Subtitle, Content} from '@smui/paper';
  import Button, {Group, GroupItem, Icon} from '@smui/button';
  import {mdiDevices, mdiCheck, mdiChat, mdiPuzzle, mdiVectorPoint, mdiEarth, mdiTrafficLight} from '@mdi/js';
</script>