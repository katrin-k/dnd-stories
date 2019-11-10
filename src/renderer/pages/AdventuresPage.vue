<template>
  <div class="bg-orange-200 wrapper wrapper--3col">
    <div class="wrapper--3col__top-row">
      <h1 class="text-4xl">
        Adventures
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
  name: 'AdventuresPage',
  components: {DynamicSlot}
};
</script>
