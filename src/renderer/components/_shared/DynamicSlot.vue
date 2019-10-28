<template>
  <aside>
    <button @click="unloadComponent">
      Schließen
    </button>
    <component :is="currentComponent"
               v-if="currentComponent"
    />
  </aside>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      currentComponent: state => state.DynamicSlot.currentComponent,
    })
  },
  methods: {
    unloadComponent(){
      this.$store.dispatch('dynamicSlotDisplayComponent', null);
    }
  },
}
</script>
