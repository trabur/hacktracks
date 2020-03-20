
<style>
  .atch {
    position: absolute;
    top: calc(50% - 70px);
    right: calc(50% - 70px);
    width: 120px;
    height: 120px;
    background: #111;
    border: 10px solid #111;
    border-radius: 5em;
  }
  .arrows {
    position: absolute;
    top: calc(50% - 28px);
    right: calc(50% - 75px);
    width: 120px;
    height: 120px;
  }
  .forward-slash {
    position: absolute;
    transform: rotate(-135deg);
    color: #F8C040;
  }
  .backward-slash {
    position: absolute;
    transform: rotate(-225deg);
    color: #F8C040;
  }
  .north {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
    color: #F8C040;
    margin: 0;
  }
  .south {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #00AEEF;
    margin: 0;
  }
  .east {
    position: absolute;
    right: 0;
    top: 30px;
    color: #F8C040;
  }
  .west {
    position: absolute;
    left: 0;
    top: 30px;
    color: #F8C040;
  }
</style>

<div class="atch">
  <div class="arrows">
    <p class="forward-slash">>>>----------[}</p>
    <p class="backward-slash">{slash}</p>
  </div>
  <p class="north">T</p>
  <p class="east">C</p>
  <p class="south">H</p> <!-- G -->
  <p class="west">A</p>
</div>

<script>
  let slash = '{]----------<<<'
</script>