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
          {{ item.title }}
        </button>
      </li>
    </ul>
  </aside>
</template>

<script>
import {Item} from '@/models/Item'

export default {
  name: 'ItemsIndex',
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
