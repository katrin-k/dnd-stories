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

<style>
/* CSS */
</style>
