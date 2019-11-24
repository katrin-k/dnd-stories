<template>
  <aside class="sidebar--left">
    <h2 class="text-2xl">
      All items
    </h2>

    <ItemNew />

    <ul class="mt-4">
      <li v-for="item in items" :key="item.$id" class="mb-2">
        <Button
          :text="item.name"
          text-button
          @click.native="loadItem($event, item.id)"
        />
      </li>
    </ul>

    <ItemCategories />
  </aside>
</template>

<script>
import { Item } from '@/store/models/Item';
import ItemNew from './ItemNew';
import ItemCategories from './ItemCategories';
import Button from '../_shared/Button';

export default {
  name: 'ItemIndex',
  components: { ItemNew, ItemCategories, Button },
  computed: {
    items() {
      return Item.all();
    }
  },
  methods: {
    loadItem(ev, id) {
      this.$router
        .push({
          name: 'items-details',
          params: { id: id }
        })
        .catch(() => {});
    }
  }
};
</script>
