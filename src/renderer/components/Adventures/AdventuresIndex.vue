<template>
  <aside class="sidebar--left">
    <h2>All adventures</h2>
    <button @click="loadItem($event, 'new')">
      New adventure
    </button>
    <ul>
      <li v-for="item in adventures"
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
import Adventure from '@/models/Adventure'

export default {
  name: 'AdventuresIndex',
  computed: {
    adventures() {
      return Adventure.all()
    }
  },
  methods: {
    loadItem(ev, id) {
      this.$router.push({ name: 'adventures-single', params: { id: id } }).catch(err => {})
    }
  },
};
</script>
