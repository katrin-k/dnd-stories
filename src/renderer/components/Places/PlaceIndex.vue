<template>
  <aside class="sidebar--left">
    <h2 class="text-2xl">
      All places
    </h2>

    <PlaceNew />

    <ul class="mt-4">
      <li v-for="place in places" :key="place.id" class="mb-2">
        <Button
          :text="place.name"
          text-button
          @click.native="loadItem($event, place.id)"
        />
      </li>
    </ul>
  </aside>
</template>

<script>
import { Place } from '@/store/models/Place';
import Button from '../_shared/Button';
import PlaceNew from './PlaceNew';

export default {
  name: 'PlaceIndex',
  components: { PlaceNew, Button },
  computed: {
    places() {
      return Place.all();
    }
  },
  methods: {
    loadItem(ev, id) {
      this.$router
        .push({ name: 'places-detail', params: { id: id } })
        .catch(() => {});
    }
  }
};
</script>
