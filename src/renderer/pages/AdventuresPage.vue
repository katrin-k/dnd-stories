<template>
  <div class="wrapper wrapper--3col">
    <div class="wrapper--3col__top-row">
      <h1>Adventures</h1>
    </div>
    <router-view name="sidebar" />
    <router-view name="main" />
    <AsideRightSlot />
  </div>
</template>

<script>
import AsideRightSlot from '../components/AsideRightSlot';

export default {
  name: 'AdventuresPage',
  components: {AsideRightSlot}
};
</script>
