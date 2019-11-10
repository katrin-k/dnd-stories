<template>
  <aside class="sidebar--left">
    <h2>All items</h2>
    <Button text="New Item"
            @click.native="loadItem($event, 'new')"
    />
    <ul class="mt-4">
      <li v-for="item in items"
          :key="item.$id"
          class="mb-2"
      >
        <Button :text="item.name"
                text-button
                @click.native="loadItem($event, item.id)"
        />
      </li>
    </ul>
    <ItemCategories />
  </aside>
</template>

<script>
import {Item} from '@/models/Item'
import ItemCategories from './ItemCategories'
import Button from '../_shared/Button'

export default {
  name: 'ItemsIndex',
  components: { ItemCategories, Button },
  computed: {
    items() {
      return Item.all()
    }
  },
  methods: {
    loadItem(ev, id) {
      this.$router
            .push({
              name: "items-details",
              params: { id: id }
            })
            .catch(err => {})
    }
  },
};
</script>
