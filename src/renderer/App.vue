<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'DndStories',
  components: { Header },
};
</script>

<style lang="scss">
#app {
  display: grid;
  grid-template-rows: 80px 1fr;
  height: 100vh;
}
</style>
