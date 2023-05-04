<template>
  <div class="Preformatted">
    <vue-code-highlight :language="language">
      {{ code }}
    </vue-code-highlight>    
  </div>
</template>

<script>
import { component as VueCodeHighlight } from 'vue-code-highlight';
import "vue-code-highlight/themes/prism-funky.css";
export default {
    name: 'Preformatted',
    components: {
        VueCodeHighlight,
    },
    props: {
        language: {
          type: String,
          default: '',
        },
        code: {
          type: String,
          default: 'No content',
        },
    },
};
</script>

<style scoped>
</style>
