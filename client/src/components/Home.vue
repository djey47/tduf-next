<template>
  <div class="Home">
    <h1 class="Home__title">Welcome to TDUF.next platform!</h1>
    <h3 class="Home__subtitle">Configuration</h3>
    <preformatted language="json">{{ JSON.stringify(this.conf, null, 1) }}</preformatted>
    <h3 class="Home__subtitle">TDUF Legacy - Database Editor launcher</h3>
    <p>
        <button v-on:click="startEditor()">start!</button>
    </p>  
    <h3 class="Home__subtitle">TDUF Legacy - BankInfo sample</h3>
    <p>
        <input class="Home__inputBankFile" type="text" placeholder="BNK file path" v-model="inputBankFile" />
        <button v-on:click="fetchBankInfo()">get</button>
    </p>
    <p>
        Result:
    </p>
    <preformatted language="json">{{ JSON.stringify(this.bankInfo, null, 1) }}</preformatted>
  </div>
</template>

<script>
import clientConfig from '../config/tduf-next.client.config.yaml';
import Preformatted from './atoms/Preformatted.vue';

export default {
  name: 'Home',
  components: { Preformatted },
  props: {},
    data() {
        return {
            conf: {},
            bankInfo: {},
            inputBankFile: '/home/djey/app/tdu/Euro/Bnk/Database/DB.bnk'
        }
    },
    mounted() {
        this.fetchConfig();
        this.fetchBankInfo();
    },  
    methods: {
        fetchConfig() {
            const options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            };
            fetch(`${clientConfig.server.url}/configuration`, options)
                .then(stream => stream.json())
                .then(data => this.conf = data)
                .catch(error => console.error(error));
        },
        fetchBankInfo() {
            const body = {
                args: {
                    input: this.inputBankFile,
                },
            };
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body), 
            };
            fetch(`${clientConfig.server.url}/tools/file/bankinfo`, options)
                .then(stream => stream.json())
                .then(data => this.bankInfo = data)
                .catch(error => console.error(error));
        },
        startEditor() {
            const body = {
                args: {
                    input: this.inputBankFile,
                },
            };
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body), 
            };
            fetch(`${clientConfig.server.url}/tools/databaseEditor/start`, options)
                // .then(stream => stream.json())
                // .then(data => this.bankInfo = data)
                .catch(error => console.error(error));
        },
    }  
}
</script>

<style scoped>
.Home__title {
    text-align: center;
}
.Home__subtitle {
    margin: 40px 0 0;
}
.Home__inputBankFile {
    width: 350px;
}
</style>
