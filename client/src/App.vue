<template>
  <div id="app">
    <p class="app__intro">
      <img class="app__introLogo" alt="Vue logo" src="./assets/logo.png">
    </p>
    <Home />
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.app__intro {
  text-align: left;
}
.app__introLogo {
  width: 64px;
  height: auto;
}
</style>
