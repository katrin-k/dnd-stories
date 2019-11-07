<template>
  <aside class="sidebar--left">
    <h2>All places</h2>
    <button @click="loadItem($event, 'new')">
      Neuer Ort
    </button>
    <ul>
      <li v-for="item in places"
          :key="item.$id"
      >
        <button @click="loadItem($event, item.$id)">
          {{ item.name }}
        </button>
      </li>
    </ul>
  </aside>
</template>

<script>
import { Place } from '@/models/Place'

export default {
  name: 'PlacesIndex',
  computed: {
    places() {
      return Place.all()
    }
  },
  methods: {
    loadItem(ev, id) {
      this.$router.push({ name: 'places-details', params: { id: id } }).catch(err => {})
    }
  },
};
</script>
