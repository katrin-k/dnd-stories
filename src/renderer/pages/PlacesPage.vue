<template>
  <div class="wrapper wrapper--3col">
    <div class="wrapper--3col__top-row">
      <h1>Places</h1>
      <p>{{ $route.path }}</p>
    </div>
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
