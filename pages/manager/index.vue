<template>
  <div>
    <h1>Manager Movie</h1>
    <div class="sidebar">
      <ul>
        <li>abc</li>
        <li>xyz</li>
        <li>fsa</li>
      </ul>
    </div>
    <div class="main">
      <div class="img-cover"><img src="" alt="Cover Movie" /></div>
      <div class="properties-movie"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
h1 {
  background: #252525;
  color: #eee;
  display: block;
  font-size: 1.6em;
  padding: 6px 15px;
}

.sidebar {
  position: fixed;
  bottom: 0;
  left: 0;
  top: 40px;
  width: 250px;
  border-right: 1px solid #555;
  ul {
    padding-left: 0;
    padding-top: 10px;
    li {
      list-style: none;
      color: #ddd;
      padding-left: 10px;
      padding-bottom: 4px;
      cursor: pointer;
    }
  }
}

.main {
  margin-left: 250px;
  padding: 25px;
  .img-cover {
    display: inline-block;
    width: 35%;
    min-height: 420px;
    border: 1px solid #666;
    font-size: 0;
    vertical-align: top;
    position: relative;

    img {
      width: 100%;
    }

    p.image-not-found {
      position: absolute;
      text-align: center;
      font-size: 16px;
      top: 50%;
      left: 0;
      right: 0;
      margin: auto;
      transform: translateY(-50%);
    }

    .lds-hourglass {
      display: inline-block;
      position: absolute;
      width: 80px;
      height: 80px;
      margin: auto;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      &::after {
        content: ' ';
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 8px;
        box-sizing: border-box;
        border: 32px solid #ddd;
        border-color: #ddd transparent #ddd transparent;
        animation: lds-hourglass 1.2s infinite;
      }
    }
  }
}

@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
