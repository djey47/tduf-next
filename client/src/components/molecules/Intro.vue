<template>
    <p class="Intro">
      <img class="Intro__logo" alt="Vue logo" src="../../assets/logo.png">
      <span class="Intro__title">TDUF.next</span>
    </p>    
</template>

<script>
export default {
    name: 'Intro',
};
</script>

<style scoped>
.Intro {
  text-align: left;
  display: flex;
  align-items: center;
  flex-direction: row;
  color: whitesmoke;
  background-color: darkslateblue;
}

.Intro__title {
  flex: 1;
  font-size: 2.6rem;
  text-align: center;
}

.Intro__logo {
  height: 64px;
  flex: 0 0 64px;
}
</style>
