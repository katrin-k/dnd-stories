<template>
  <div>
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
      <!-- TODO: check for required -->
      <select v-model="item.category_id"
              required
      >
        <option disabled
                value=""
        >
          Kategorie
        </option>
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
</template>

<script>
import { Item, ItemCategory } from '@/models/Item'

export default {
  name: 'ItemNew',
  computed: {
    item() {
      return new Item()
    },
    itemCategories() {
      return ItemCategory.all()
    },
    itemCategory() {
      const name = ItemCategory.query().whereId(parseInt(this.item.category_id)).get()
      return name[0]
    },
  },
  methods: {
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
    addCategoryToItem() {
      this.item.category = this.itemCategory
    },
  },
}
</script>
