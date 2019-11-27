<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.van-toast--middle {
  min-width: 30%;
  height: 10%;
  font-size: 28px;
}
.van-icon{
  font-size: 28px;
}
.van-toast__text{
  font-size: 28px;
}
.hidden{
  height: 100%;
  overflow: hidden;
}
</style>
