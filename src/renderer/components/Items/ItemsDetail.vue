<template>
  <main>
    <h2 class="text-2xl">
      Items Details
    </h2>

    <div v-if="this.$route.params.id === 'init'">
      <p>Wähle ein Item aus.</p>
    </div>

    <div v-if="this.$route.params.id === 'new'">
      <ItemNew />
    </div>

    <div v-if="slotId || typeof this.$route.params.id === 'number'">
      <ItemShow />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import ItemNew from './ItemNew'
import ItemShow from './ItemShow'

export default {
  name: 'ItemsDetail',
  components: { ItemNew, ItemShow },
  computed: {
    ...mapState({
      slotId: state => state.DynamicSlot.slotId,
    }),
  },
};

</script>
