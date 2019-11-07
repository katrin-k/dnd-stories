<template>
  <aside class="sidebar--left">
    <h2>All items</h2>
    <button @click="loadItem($event, 'new')">
      New item
    </button>
    <ul>
      <li v-for="item in items"
          :key="item.$id"
      >
        <button @click="loadItem($event, item.$id)">
          {{ item.name }}
        </button>
      </li>
    </ul>
    <ItemCategories />
  </aside>
</template>

<script>
import {Item} from '@/models/Item'
import ItemCategories from './ItemCategories'

export default {
  name: 'ItemsIndex',
  components: { ItemCategories },
  computed: {
    items() {
      return Item.all()
    }
  },
  methods: {
    loadItem(ev, id) {
      this.$router.push({ name: 'items-details', params: { id: id } }).catch(err => {})
    }
  },
};
</script>
