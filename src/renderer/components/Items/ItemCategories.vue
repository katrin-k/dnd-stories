<template>
  <main>
    <h1>
      Item Categories
      <a v-if="!isExpanded"
         @click.prevent="expandList"
      >Expand</a>
      <a v-else
         @click.prevent="expandList"
      >Collapse</a>
    </h1>
    <div v-if="isExpanded">
      <ul>
        <li v-for="cat in itemCategories"
            :key="cat.id"
        >
          {{ cat.name }}
          <button @click="handleDeleteWish(cat.item_cat_id)">
            Kat. löschen
          </button>
        </li>
      </ul>

      <h2>Neue Itemkategorie</h2>
      <form>
        <label for="name">
          Name
        </label>
        <input id="name"
               v-model.lazy="newCategory.name"
               type="text"
               name="name"
        >

        <input type="submit"
               value="Itemkategorie speichern"
               @click.prevent="saveItemCategory"
        >
      </form>
    </div>
  </main>
</template>

<script>
import { ItemCategory } from '@/models/Item'

export default {
  name: 'ItemCategories',
  data() {
    return {
      newCategory: new ItemCategory(),
      isExpanded: false
    };
  },
  computed: {
    itemCategories() {
      return ItemCategory.all()
    }
  },
  methods: {
    async saveItemCategory() {
      const item = await this.newCategory.$save()
        console.log(item)

      this.newCategory = new ItemCategory()
    },
    handleDeleteWish(id) {
      console.log('ItemCategory', ItemCategory.delete);
      ItemCategory.delete(id)
      // this.$router.push({ name: 'items-details', params: { id: 'init' } }).catch(err => {})
    },
    expandList(ev) {
      this.isExpanded = !this.isExpanded
    }
  },
};

</script>
