<template>
  <main>
    <h1>Places Show</h1>

    <div v-if="this.$route.params.id === 'init'">
      <p>Wähle einen Ort aus.</p>
    </div>

    <div v-if="this.$route.params.id === 'new'">
      <h2>Neuer Ort</h2>
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
               @click.prevent="savePlace"
        >
      </form>
    </div>

    <div v-if="typeof this.$route.params.id === 'number'">
      <h2>Existierender Ort</h2>
      <h2>{{ place.name }}</h2>
      <h3>Beschreibung</h3>
      <p>{{ place.description }}</p>
      <h3>Lokalisierung</h3>
      <p>{{ place.localization }}</p>
      <h3>Verwandte Items</h3>
      <ul>
        <li>
          <button @click="loadComponent($event, 'test-slot-one')">
            Item one (eg a room)
          </button>
        </li>
        <li>
          <button @click="loadComponent($event, 'test-slot-two')">
            Item two (eg a treasure)
          </button>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import { Place, PlaceCategory } from '@/models/Place'

export default {
  name: 'PlacesShow',
  data() {
    return {
      place: null
    };
  },
  beforeRouteUpdate: function(to, from, next) {
    this.fetchPlace(to.params.id).then((response) => {
      this.place= response;
      next()
    },(error) => {
      console.error("Failed!", error);
    })
  },
  methods: {
    ...mapActions([
      'dynamicSlotDisplayComponent'
    ]),
    fetchPlace(id) {
      return new Promise( (resolve, reject) => {
        let place;
        (id === 'new')
          ? place = new Place()
          : place = Place.find(id);
        if (place) {
          resolve(place);
        }
        else {
          reject(Error("It broke"));
        }
      })
    },
    savePlace() {
      this.place.$save(this.place);
    },
    loadComponent(event, componentName) {
      this.dynamicSlotDisplayComponent(componentName);
    },
  },
};


</script>
