<template>
  <div id="app">
    <header>
      <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
      <span v-if="this.$route.params.userName" style="text-align: right;display: inline-block;height: 2rem;line-height: 2rem;" @click="userMng">欢迎您，{{this.$route.params.userName}}，{{new Date() | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
    </header>
    <!-- 对应的组件内容渲染到router-view中 -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  export default{
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      },
      userMng() {
        this.$router.push({name: 'userMng'})
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1rem;
}
</style>
