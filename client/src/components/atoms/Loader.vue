<template>
  <div class="Loader">
    <pacman-loader
      v-if="isLoading"
      class="Loader__loader"
    />
  </div>
</template>

<script>
import { PacmanLoader } from 'vue-spinner/dist/vue-spinner.min';
export default {
    name: 'Loader',
    components: {
        PacmanLoader,
    },
    props: {
        isLoading: Boolean,
    },
};
</script>

<style scoped>
.Loader {
    padding: 16px 0;
    display: flex;
}

.Loader__loader {
    margin: auto;
}
</style>
