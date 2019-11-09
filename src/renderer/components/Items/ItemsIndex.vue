<template>
  <aside class="sidebar--left">
    <h2>All items</h2>
    <Button text="New Item"
            @click.native="loadItem($event, 'new')"
    />
    <ul>
      <li v-for="item in items"
          :key="item.$id"
      >
        <Button :text="item.name"
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
