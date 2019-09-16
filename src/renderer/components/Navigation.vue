<template>
  <ul>
    <li>
      <router-link :to="{ name: 'landing-page' }">Home</router-link>
      <router-link :to="{ name: 'beings-index' }">Beings</router-link>
      <router-link :to="{ name: 'things-index' }">Things</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Navigation"
};
</script>

<style lang="scss">
ul a {
  color: $body-color;
}
</style>
