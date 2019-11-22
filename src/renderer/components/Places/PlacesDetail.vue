<template>
  <main>
    <h2 class="text-2xl">
      Places Details
    </h2>

    <div v-if="this.$route.params.id === 'init'">
      <p>Wähle einen Ort aus.</p>
    </div>

    <div v-if="this.$route.params.id === 'new'">
      <PlaceNew />
    </div>

    <div v-if="typeof this.$route.params.id === 'number'">
      <PlaceShow />
    </div>
  </main>
</template>

<script>
import PlaceNew from './PlaceNew';
import PlaceShow from './PlaceShow';

export default {
  name: 'PlacesDetail',
  components: { PlaceNew, PlaceShow }
};
</script>
