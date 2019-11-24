<template>
  <main>
    <h2 class="text-2xl">
      Items Details
    </h2>

    <div v-if="this.$route.params.id === 'init'">
      <p>Wähle ein Item aus.</p>
    </div>

    <div v-if="typeof this.$route.params.id === 'number'">
      <ItemShow />
    </div>
  </main>
</template>

<script>
import ItemShow from './ItemShow';

export default {
  name: 'ItemDetail',
  components: { ItemShow }
};
</script>
