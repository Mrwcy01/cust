<template>
  <div id="app">
    <router-view />
    <goUp />
  </div>
</template>
<script>
import goUp from './components/goUp'
export default {
  name: 'App',
  components: {
    goUp
  },
  mounted() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>
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
