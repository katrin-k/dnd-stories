<template>
  <div class="mt-4">
    <h1 class="flex justify-between items-center">
      Item Categories
      <a v-if="!isExpanded"
         class="text-blue-700 underline"
         @click.prevent="expandList"
      >Expand</a>
      <a v-else
         class="text-blue-700 underline"
         @click.prevent="expandList"
      >Collapse</a>
    </h1>
    <div v-if="isExpanded">
      <ul class="my-6">
        <li v-for="cat in itemCategories"
            :key="cat.id"
            class="flex justify-between items-center mb-2 hover:bg-gray-400"
        >
          {{ cat.name }}
          <Button text="delete"
                  @click.native="handleDeleteWish(cat.item_cat_id)"
          />
        </li>
      </ul>

      <h3>Neue Itemkategorie</h3>
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
  </div>
</template>

<script>
import { ItemCategory } from '@/models/Item'
import Button from '../_shared/Button'

export default {
  name: 'ItemCategories',
  components: { Button },
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
      this.newCategory = new ItemCategory()
    },
    handleDeleteWish(id) {
      ItemCategory.delete(id)
    },
    expandList(ev) {
      this.isExpanded = !this.isExpanded
    }
  },
};

</script>
