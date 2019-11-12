<template>
  <div>
    <h2 class="text-2xl">
      {{ place.name }}
    </h2>
    <h3>Beschreibung</h3>
    <p>{{ place.description }}</p>
    <h3>Lokalisierung</h3>
    <p>{{ place.localization }}</p>

    <hr class="border-orange-900">

    <ActionBar>
      <Button text="Ort löschen"
              @click.native="handleDeleteWish(place.id)"
      />
    </ActionBar>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Place, PlaceCategory } from '@/models/Place'
import Button from '../_shared/Button'
import ActionBar from '../_shared/ActionBar'

export default {
  name: 'PlaceShow',
  components: { Button, ActionBar },
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
