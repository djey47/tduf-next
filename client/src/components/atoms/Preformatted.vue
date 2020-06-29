<template>
    <pre class="Preformatted"><code :lang="language"><slot>No content</slot></code></pre>    
</template>

<script>
export default {
    name: 'Preformatted',
    props: {
        text: String,
        language: String,
    },
};
</script>

<style scoped>
.Preformatted {
    text-align: left;
    background-color: black;
    color: blanchedalmond;
    font-family: monospace;
    font-size: 1.2rem;
}
</style>
