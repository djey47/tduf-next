<template>
  <div id="app">
    <Intro />
    <Home v-bind:conf="this.conf" />
  </div>
</template>

<script>
import clientConfig from './config/tduf-next.client.config.yaml';
import Home from './components/pages/Home.vue';
import Intro from './components/molecules/Intro.vue';
import { get } from './helpers/rest-client';
 
export default {
    name: 'App',
    components: {
        Intro,
        Home,
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
</style>
