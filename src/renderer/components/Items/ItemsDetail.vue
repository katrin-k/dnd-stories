<template>
  <main>
    <h1>Items Show</h1>

    <div v-if="this.$route.params.id === 'init'">
      <p>Wähle ein Item aus.</p>
    </div>

    <div v-if="this.$route.params.id === 'new'">
      <ItemNew />
    </div>

    <div v-if="typeof this.$route.params.id === 'number'">
      <ItemShow />
    </div>
  </main>
</template>

<script>
import ItemNew from './ItemNew'
import ItemShow from './ItemShow'

export default {
  name: 'ItemsDetail',
  components: { ItemNew, ItemShow }
};

</script>
