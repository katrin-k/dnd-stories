<template>
  <div class="mt-4">
    <h2 class="flex justify-between items-center text-2xl">
      Item Categories
      <a v-if="!isExpanded"
         class="font-normal text-blue-700 underline"
         @click.prevent="expandList"
      >expand</a>
      <a v-else
         class="font-normal text-blue-700 underline"
         @click.prevent="expandList"
      >collapse</a>
    </h2>
    <div v-if="isExpanded">
      <ul class="my-6">
        <li v-for="cat in itemCategories"
            :key="cat.id"
            class="flex justify-between items-center mb-2 p-2 rounded-sm hover:bg-orange-300"
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
        <ActionBar>
          <Button text="Itemkategorie speichern"
                  type-submit
                  @click.native.prevent="saveItemCategory"
          />
        </ActionBar>
      </form>
    </div>
  </div>
</template>

<script>
import { ItemCategory } from '@/store/models/Item'
import Button from '../_shared/Button'
import ActionBar from '../_shared/ActionBar'

export default {
  name: 'ItemCategories',
  components: { Button, ActionBar },
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
