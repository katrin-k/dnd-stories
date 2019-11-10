<template>
  <div class="wrapper wrapper--3col">
    <div class="wrapper--3col__top-row">
      <h1 class="text-4xl">
        Items
      </h1>
      <p class="mx-4">
        Route path: {{ $route.path }}
      </p>
    </div>
    <router-view name="sidebar" />
    <router-view name="main" />
    <DynamicSlot />
  </div>
</template>

<script>
import DynamicSlot from '../components/_shared/DynamicSlot';

export default {
  name: 'ItemsPage',
  components: {DynamicSlot}
};
</script>
