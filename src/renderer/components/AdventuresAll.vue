<template>
  <aside class="sidebar--left">
    <h2>All adventures</h2>
    <ul>
      <li v-for="item in adventures"
          :key="item.id"
          @click="loadItem(item)"
      >
        {{ item.title }}
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdventuresAll',
  computed: {
    ...mapState({
      adventures: state => state.Adventure.adventures,
    })
  }
};
</script>
