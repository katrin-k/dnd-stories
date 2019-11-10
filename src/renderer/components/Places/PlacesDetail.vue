<template>
  <main>
    <h1>Places Details</h1>

    <div v-if="this.$route.params.id === 'init'">
      <p>Wähle einen Ort aus.</p>
    </div>

    <div v-if="this.$route.params.id === 'new'">
      <PlaceNew />
    </div>

    <div v-if="slotId || typeof this.$route.params.id === 'number'">
      <PlaceShow />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import PlaceNew from './PlaceNew'
import PlaceShow from './PlaceShow'

export default {
  name: 'PlacesDetail',
  components: { PlaceNew, PlaceShow },
  computed: {
    ...mapState({
      slotId: state => state.DynamicSlot.slotId,
    }),
  },
};
</script>
