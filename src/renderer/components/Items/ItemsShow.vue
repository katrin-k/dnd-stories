<template>
  <main>
    <h1>Items Show</h1>

    <div v-if="this.$route.params.id === 'init'">
      <p>Wähle ein Item aus.</p>
    </div>

    <div v-if="this.$route.params.id === 'new'">
      <h2>Neues Item</h2>
      <form>
        <label for="name">
          Name
        </label>
        <input id="name"
               v-model.lazy="item.name"
               type="text"
               name="name"
        >
        <label for="description">Beschreibung</label>
        <textarea
          id="description"
          v-model.lazy="item.description"
          name="description"
          rows="10"
        />
        <label for="quantity">Anzahl</label>
        <input id="quantity"
               v-model.lazy="item.quantity"
               type="text"
               name="quantity"
        >
        <label for="is_collected">Ist eingesammelt?</label>
        <input id="is_collected"
               v-model.lazy="item.is_collected"
               type="checkbox"
               name="is_collected"
        >
        <select v-model="item.category_id">
          <option v-for="cat in itemCategories"
                  :key="cat.item_cat_id"
                  :value="cat.item_cat_id"
          >
            {{ cat.name }} {{ cat.item_cat_id }}
          </option>
        </select>

        <input type="submit"
               value="Item speichern"
               @click.prevent="saveNewItem"
        >
      </form>
    </div>

    <div v-if="typeof this.$route.params.id === 'number'">
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
      <p>{{ item.category_id }} - {{ itemCategory.name }}</p>
      <h3>Verwandte Orte</h3>
      <ul v-if="item.places.length > 0">
        <li v-for="place in item.places"
            :key="place.id"
        >
          {{ place.name }}
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
import { Item, ItemCategory, PlaceItem } from '@/models/Item'
import { Place } from '@/models/Place'

export default {
  name: 'ItemsShow',
  data() {
    return {
      item: null,
      editingPlace: false
    };
  },
  computed: {
    itemCategories() {
      return ItemCategory.all()
    },
    itemCategory() {
      const name = ItemCategory.query().whereId(parseInt(this.item.category_id)).get()
      return name[0]
    },
    places() {
      return Place.all()
    },
  },
  beforeRouteUpdate: function(to, from, next) {
    if (to.params.id !== 'init') {
      (to.params.id === 'new')
        ? this.item = new Item()
        : this.item = Item.find(to.params.id);
    }
    next()
  },
  methods: {
    ...mapActions([
      'dynamicSlotDisplayComponent'
    ]),
    saveNewItem() {
      if (this.item.category_id) {
        this.addCategoryToItem()
      }

      Item.insert({
        data: this.item,
        update: ['itemCategory']
      }).then(entities => {
        this.$router.push({ name: 'items-details', params: { id: entities.items[0].id } }).catch(err => {})
      })
    },
    handleDeleteWish(id) {
      Item.delete(id)
      this.$router.push({ name: 'items-details', params: { id: 'init' } }).catch(err => {})
    },
    addCategoryToItem() {
      this.item.category = this.itemCategory
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
    loadComponent(event, componentName) {
      this.dynamicSlotDisplayComponent(componentName);
    },
  },
};

</script>
