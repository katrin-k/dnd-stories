<template>
  <div class="wrapper wrapper--3col">
    <h1 class="wrapper--3col__top-row">
      Places
    </h1>
    <router-view name="sidebar" />
    <router-view name="main" />
    <DynamicSlot />
  </div>
</template>

<script>
import DynamicSlot from '../components/_shared/DynamicSlot';

export default {
  name: 'PlacesPage',
  components: {DynamicSlot}
};
</script>
