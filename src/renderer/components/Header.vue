<template>
  <header>
    <div class="header__logo-wrapper">
      <img
        src="../assets/img/logo-dnd-fullname.png"
        alt="Dnd-Logo"
        class="header__logo"
      />
    </div>
    <Navigation />
  </header>
</template>

<script>
import Navigation from "./Navigation";

export default {
  name: "Header",
  components: { Navigation }
};
</script>

<style lang="scss" scoped>
.header__logo-wrapper {
  width: 200px;
}
</style>
