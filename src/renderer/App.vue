<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/_shared/Header';

export default {
  name: 'DndStories',
  components: { Header },
};
</script>

<style src="./assets/styles/tailwind.css">
/*

  Looks strange?
  See https://github.com/tailwindcss/setup-examples/tree/master/examples/vue-cli

*/
</style>
