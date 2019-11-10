<template>
  <div>
    <h2 class="text-2xl">
      Neuer Ort
    </h2>
    <form>
      <label for="name">
        Name
      </label>
      <input id="name"
             v-model.lazy="place.name"
             type="text"
             name="name"
      >
      <label for="description">Beschreibung</label>
      <textarea
        id="description"
        v-model.lazy="place.description"
        name="description"
        rows="10"
      />
      <label for="localization">Lokalisierung</label>
      <input id="localization"
             v-model.lazy="place.localization"
             type="text"
             name="localization"
      >

      <input type="submit"
             value="Ort speichern"
             @click.prevent="saveNewPlace"
      >
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Place, PlaceCategory } from '@/models/Place'

export default {
  name: 'PlacesNew',
  computed: {
    ...mapState({
      slotId: state => state.DynamicSlot.slotId,
    }),
    place() {
      return new Place()
    },
  },
  methods: {
    saveNewPlace() {
      Place.insert({
        data: this.place
      }).then(entities => {
        this.$router.push({ name: 'places-detail', params: { id: entities.places[0].id } }).catch(err => {})
      })
    }
  },
};
</script>
