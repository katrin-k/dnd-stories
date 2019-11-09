<template>
  <div>
    <button @click="handleDeleteWish(place.id)">
      Ort löschen
    </button>

    <h2>Existierender Ort</h2>
    <h2>{{ place.name }}</h2>
    <h3>Beschreibung</h3>
    <p>{{ place.description }}</p>
    <h3>Lokalisierung</h3>
    <p>{{ place.localization }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Place, PlaceCategory } from '@/models/Place'

export default {
  name: 'PlaceShow',
  computed: {
    ...mapState({
      slotId: state => state.DynamicSlot.slotId,
    }),
    place() {
      return this.slotId ? Place.find(this.slotId) : Place.find(this.$route.params.id)
    },
  },
  methods: {
    ...mapActions([
      'dynamicSlotDisplayComponent'
    ]),
    handleDeleteWish(id) {
      Place.delete(id)
      this.$router.push({ name: 'places-detail', params: { id: 'init' } }).catch(err => {})
    },
    loadComponent(event, componentName, id) {
      this.dynamicSlotDisplayComponent({
        componentName: componentName,
        slotId: id
      });
    },
  },
};


</script>
