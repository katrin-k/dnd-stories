<template>
  <aside class="sidebar--left">
    <h2>All places</h2>
    <Button text="Neuer
        Ort"
            @click.native="loadItem($event, 'new')"
    />
    <ul class="mt-4">
      <li v-for="place in places"
          :key="place.id"
          class="mb-2"
      >
        <Button :text="place.name"
                text-button
                @click.native="loadItem($event, place.id)"
        />
      </li>
    </ul>
  </aside>
</template>

<script>
import { Place } from '@/models/Place'
import Button from '../_shared/Button'

export default {
  name: 'PlacesIndex',
  components: { Button },
  computed: {
    places() {
      return Place.all()
    }
  },
  methods: {
    loadItem(ev, id) {
      this.$router.push({ name: 'places-detail', params: { id: id } }).catch(err => {})
    }
  },
};
</script>
