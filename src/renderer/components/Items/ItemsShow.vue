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
               @click.prevent="saveItem"
        >
      </form>
    </div>

    <div v-if="typeof this.$route.params.id === 'number'">
      <button @click="handleDeleteWish(item.id)">
        Item löschen
      </button>
      <h2>Existierendes Item</h2>
      <h2>{{ item.name }}</h2>
      <h3>Beschreibung</h3>
      <p>{{ item.description }}</p>
      <h3>Lokalisierung</h3>
      <p>{{ item.localization }}</p>
      <h3>Kategorie</h3>
      <p>{{ item.category_id }}</p>
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
      item: null,
      itemCategories: null
    };
  },
  async created() {
    // console.log('Item.new', await new Item());
    return this.itemCategories = await ItemCategory.all()
  },
  async updated() {
    console.log('item in updated', this.item);
  },
  beforeRouteUpdate: function(to, from, next) {
    if (to.params.id !== 'init') {
      this.fetchItem(to.params.id).then((response, error) => {
        console.log('reponse', response);
        console.log('this.item before reponse', this.item);
        this.item = response;
        console.log('this.item after reponse', this.item);
      },(error) => {
        console.error("Failed!", error);
      })
    }
    next()
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
    async saveItem() {
      console.log('this.item before create', this.item);
      Item.insert({
        data: this.item,
        insertOrUpdate: ['itemCategory']
      })
      // const item = this.item.$save()
      // const savedItem = await Item.insert({data: this.item})
      // Item.dispatch('insert', {data: this.item})

      // push to new item
      // this.$router.push({ name: 'items-details', params: { id: this.item.id } }).catch(err => {})
    },
    handleDeleteWish(id) {
      Item.delete(id)
      this.$router.push({ name: 'items-details', params: { id: 'init' } }).catch(err => {})
    },
    loadComponent(event, componentName) {
      this.dynamicSlotDisplayComponent(componentName);
    },
  },
};

</script>
