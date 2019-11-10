<template>
  <aside class="sidebar--left">
    <h2>All adventures</h2>
    <Button text="New adventure"
            @click.native="loadItem($event, 'new')"
    />
    <ul class="mt-4">
      <li v-for="item in adventures"
          :key="item.$id"
          class="mb-2"
      >
        <Button :text="item.title"
                text-button
                @click.native="loadItem($event, item.id)"
        />
      </li>
    </ul>
  </aside>
</template>

<script>
import Adventure from '@/models/Adventure'
import Button from '../_shared/Button'

export default {
  name: 'AdventuresIndex',
  components: { Button },
  computed: {
    adventures() {
      return Adventure.all()
    }
  },
  methods: {
    loadItem(ev, id) {
      this.$router.push({ name: 'adventures-details', params: { id: id } }).catch(err => {})
    }
  },
};
</script>
