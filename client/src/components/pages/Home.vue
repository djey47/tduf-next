<template>
  <div class="Home">
    <h1 class="Home__title">
      Welcome to TDUF.next platform!
    </h1>
    <section class="Home__section">
      <h3 class="Home__subtitle">
        Configuration
      </h3>
      <preformatted
        language="javascript"
        :code="formatJson(conf)"
      />
    </section>
    <section class="Home__section">
      <h3 class="Home__subtitle">
        TDUF Legacy - Database Editor launcher
      </h3>
      <p>
        <button @click="startEditor()">
          start!
        </button>
      </p>
    </section> 
    <section class="Home__section">
      <h3 class="Home__subtitle">
        TDUF Legacy - BankInfo sample
      </h3>
      <p>
        <input
          v-model="inputBankFile"
          class="Home__inputBankFile"
          type="text"
          placeholder="BNK file path"
        >
        <button @click="fetchBankInfo()">
          get
        </button>
      </p>
      <loader :is-loading="isBankInfoLoading" />
      <preformatted
        v-if="isBankInfoLoaded"
        language="javascript"
        :code="formatJson(bankInfo)"
      />
    </section> 
  </div>
</template>

<script>
import Preformatted from '../atoms/Preformatted.vue';
import Loader from '../atoms/Loader.vue';
import { post } from '../../helpers/rest-client';

export default {
  name: 'Home',
  components: { Preformatted, Loader },
  props: {
      conf: {
        type: Object,
        default: () => {},
      },
  },
    data() {
        return {
            isBankInfoLoading: false,
            isBankInfoLoaded: false,
            bankInfo: {},
            inputBankFile: '/home/djey/app/tdu/Euro/Bnk/Database/DB.bnk',
        };
    },
    mounted() {
    },  
    methods: {
        formatJson(o) {
            return JSON.stringify(o, null, 2);
        },
        fetchBankInfo() {
            this.isBankInfoLoaded = false;
            this.isBankInfoLoading = true;
            const body = {
                args: {
                    input: this.inputBankFile,
                },
            };
            post(`${this.conf.gui.serverUrl}/tools/file/bankinfo`, body, data => {
                this.isBankInfoLoaded = true;
                this.isBankInfoLoading = false;
                this.bankInfo = data;
            });
        },
        startEditor() {
            const body = {
                args: {
                    input: this.inputBankFile,
                },
            };
            post(`${this.conf.gui.serverUrl}/tools/databaseEditor/start`, body);
        },
    },  
};
</script>

<style scoped>
.Home {
    padding: 4px 4px;
}

.Home__section {
    /* padding: 0 4px; */
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
