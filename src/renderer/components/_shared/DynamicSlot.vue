<template>
  <aside>
    <Button
      v-if="currentComponent"
      text="Schließen"
      class="block ml-auto"
      @click.native="unloadComponent"
    />
    <component
      :is="currentComponent"
      v-if="currentComponent"
      :slot-id="slotId"
    />
  </aside>
</template>

<script>
import { mapState } from 'vuex';
import Button from './Button';

export default {
  name: 'DynamicSlot',
  components: { Button },
  computed: {
    ...mapState({
      currentComponent: state => state.DynamicSlot.currentComponent,
      slotId: state => state.DynamicSlot.slotId
    })
  },
  methods: {
    unloadComponent() {
      this.$store.dispatch('dynamicSlotDisplayComponent', {});
    }
  }
};
</script>
