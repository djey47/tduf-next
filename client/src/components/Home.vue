<template>
  <div class="Home">
    <h1 class="Home__title">Welcome to TDUF.next platform!</h1>
    <section class="Home__section">
        <h3 class="Home__subtitle">Configuration</h3>
        <preformatted language="json">{{ JSON.stringify(this.conf, null, 1) }}</preformatted>
    </section>
    <section class="Home__section">
        <h3 class="Home__subtitle">TDUF Legacy - Database Editor launcher</h3>
        <p>
            <button v-on:click="startEditor()">start!</button>
        </p>
    </section> 
    <section class="Home__section">
        <h3 class="Home__subtitle">TDUF Legacy - BankInfo sample</h3>
        <p>
            <input class="Home__inputBankFile" type="text" placeholder="BNK file path" v-model="inputBankFile" />
            <button v-on:click="fetchBankInfo()">get</button>
        </p>
        <preformatted language="json">{{ JSON.stringify(this.bankInfo, null, 1) }}</preformatted>
    </section> 
  </div>
</template>

<script>
import Preformatted from './atoms/Preformatted.vue';
import { post } from '../helpers/rest-client';

export default {
  name: 'Home',
  components: { Preformatted },
  props: {
      conf: Object,
  },
    data() {
        return {
            bankInfo: {},
            inputBankFile: '/home/djey/app/tdu/Euro/Bnk/Database/DB.bnk'
        }
    },
    mounted() {
        this.fetchBankInfo();
    },  
    methods: {
        fetchBankInfo() {
            const body = {
                args: {
                    input: this.inputBankFile,
                },
            };
            post(`${this.conf.gui.serverUrl}/tools/file/bankinfo`, body, data => this.bankInfo = data);
        },
        startEditor() {
            const body = {
                args: {
                    input: this.inputBankFile,
                },
            };
            post(`${this.conf.gui.server.url}/tools/databaseEditor/start`, body);
        },
    }  
}
</script>

<style scoped>
.Home__section {
    padding: 0 4px;
    margin-bottom: 32px;
}
.Home__title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 100;
    margin-bottom: 16px;
}
.Home__subtitle {
    font-size: 1.2rem;
    font-weight: 100;
    margin-bottom: 8px;
}
.Home__inputBankFile {
    width: 350px;
}
</style>
