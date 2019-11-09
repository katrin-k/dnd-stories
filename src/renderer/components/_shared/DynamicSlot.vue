<template>
  <aside>
    <button @click="unloadComponent">
      Schließen
    </button>
    <component :is="currentComponent"
               v-if="currentComponent"
               :slot-id="slotId"
    />
  </aside>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      currentComponent: state => state.DynamicSlot.currentComponent,
      slotId: state => state.DynamicSlot.slotId,
    })
  },
  methods: {
    unloadComponent(){
      this.$store.dispatch('dynamicSlotDisplayComponent', {});
    }
  },
}
</script>
