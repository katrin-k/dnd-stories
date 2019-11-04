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

        <input type="submit"
               value="Item speichern"
               @click.prevent="saveItem"
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
import { Item, ItemCategory } from '@/models/Item'

export default {
  name: 'ItemsShow',
  data() {
    return {
      item: null
    };
  },
  beforeRouteUpdate: function(to, from, next) {
    if (to.params.id !== 'init') {
      this.fetchItem(to.params.id).then((response) => {
        this.item = response;
        next()
      },(error) => {
        console.error("Failed!", error);
      })
    }
  },
  methods: {
    ...mapActions([
      'dynamicSlotDisplayComponent'
    ]),
    fetchItem(id) {
      return new Promise( (resolve, reject) => {
        let item;
        (id === 'new')
          ? item = new Item()
          : item = Item.find(id);
        if (item) {
          resolve(item);
        }
        else {
          reject(Error("It broke"));
        }
      })
    },
    saveItem() {
      this.item.$save(this.item);
    },
    loadComponent(event, componentName) {
      this.dynamicSlotDisplayComponent(componentName);
    },
  },
};

</script>
