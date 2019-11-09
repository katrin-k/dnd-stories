<template>
  <div>
    <button @click="handleDeleteWish(item.id)">
      Item löschen
    </button>

    <h2>Existierendes Item</h2>
    <h2>{{ item.name }} | {{ item.id }}</h2>
    <h3>Beschreibung</h3>
    <p>{{ item.description }}</p>
    <h3>Lokalisierung</h3>
    <p>{{ item.localization }}</p>
    <h3>Kategorie</h3>
    <p v-if="itemCategory">
      {{ item.category_id }} - {{ itemCategory.name }}
    </p>

    <h3>Verwandte Orte</h3>
    <ul v-if="item.places.length > 0">
      <li v-for="place in item.places"
          :key="place.id"
      >
        {{ place.name }}
        <button @click="loadComponent($event, 'place-show', place.id)">
          {{ place.name }}
        </button>
      </li>
    </ul>
    <div v-if="!editingPlace"
         class="add-relation"
    >
      <button @click="showAddPlace">
        Ort hinzufügen
      </button>
    </div>
    <div v-else
         class="add-relation"
    >
      <select :value="item.places"
              @change="addPlacetoItem"
      >
        <option v-for="place in places"
                :key="place.id"
                :value="place.id"
        >
          {{ place.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Item, ItemCategory, PlaceItem } from '@/models/Item'
import { Place } from '@/models/Place'

export default {
  name: 'ItemShow',
  data() {
    return {
      editingPlace: false
    };
  },
  computed: {
    item() {
      return Item.find(this.$route.params.id)
    },
    itemCategory() {
      const name = ItemCategory.query().whereId(parseInt(this.item.category_id)).get()
      return name[0]
    },
    places() {
      return Place.all()
    },
  },
  methods: {
    ...mapActions([
      'dynamicSlotDisplayComponent'
    ]),
    handleDeleteWish(id) {
      Item.delete(id)
      this.$router.push({ name: 'items-details', params: { id: 'init' } }).catch(err => {})
    },
    showAddPlace() {
      this.editingPlace = true
    },
    handleAddPlace() {
      Item.update({
        data: this.item
      }).then(entities => {
        this.editingPlace = false
      })
    },
    addPlacetoItem(ev){
      const prevPlaces = this.item.places
      const newPlace = this.places.filter(place => {
        return place.id.toString() === ev.target.value
      })

      Item.update({
        where: this.item.id,
        data: {
          places: [...prevPlaces, ...newPlace]
        }
      }).then(entities => {
        this.editingPlace = false
        this.$router.push({ name: 'items-details', params: { id: this.item.id } }).catch(err => {})
      })
    },
    loadComponent(event, componentName, id) {
      this.dynamicSlotDisplayComponent({
        componentName: componentName,
        slotId: id
      });
    },
  },
}
</script>
