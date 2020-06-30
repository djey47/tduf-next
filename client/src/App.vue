<template>
  <div id="app">
    <p class="app__intro">
      <img class="app__introLogo" alt="Vue logo" src="./assets/logo.png">
    </p>
    <Home v-bind:conf="this.conf" />
  </div>
</template>

<script>
import clientConfig from './config/tduf-next.client.config.yaml';
import Home from './components/Home.vue';
import { get } from './helpers/rest-client';

export default {
    name: 'App',
    components: {
        Home
    },
    data() {
        return {
            conf: {},
        };
    },
    mounted() {
        this.fetchConfig();
    },
    methods: {
        fetchConfig() {
            get(`${clientConfig.serverUrl}/configuration`, data => {
                    this.conf = {
                       ...data,
                       gui: {
                           ...data.gui,
                           ...clientConfig,
                       },
                    };
                });
        },
    },
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
