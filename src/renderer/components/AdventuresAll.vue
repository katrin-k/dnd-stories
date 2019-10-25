<template>
  <aside class="sidebar--left">
    <h2>All adventures</h2>
    <button @click="handleNew($event, 'AdventureSingle')">
      New adventure
    </button>
    <ul>
      <li v-for="item in adventures"
          :key="item.id"
      >
        <router-link :to="{ name: 'adventures-single', params: { id: item.$id, adventure: item } }">
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import Adventure from '@/models/Adventure'

export default {
  name: 'AdventuresAll',
  computed: {
    adventures() {
      return Adventure.all()
    }
  },
  methods: {
    handleNew(event, componentName) {
      this.$router.push({ name: 'adventures-single', params: { id: 'new' } }).catch(err => {})
    },
    loadItem(item) {
      console.log('item', item);
      this.$router.push({ name: 'adventures-single', params: { id: item.$id } }).catch(err => {})
    }
  },
};
</script>
