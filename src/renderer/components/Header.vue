<template>
  <header class="header">
    <div class="header__logo-wrapper">
      <img src="../assets/img/logo-dnd-fullname.png"
           alt="Dnd-Logo"
           class="header__logo"
      >
    </div>

    <Navigation />
    <button class="header__settings">
      Settings
    </button>
  </header>
</template>

<script>
import Navigation from './Navigation';

export default {
  name: 'Header',
  components: { Navigation },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $primary;
  color: $secondary;
}

.header__logo-wrapper {
  width: 500px;
}

.header__logo {
  display: block;
}

.header__settings {
  background: none;
  font: inherit;
  color: inherit;
  margin: $sm-spacing;
  padding: 0 $sm-spacing;
  border: 1px solid $secondary;
  @include border-radius();
  @include transition();
  cursor: pointer;

  &:hover,
  &:focus {
    background: $secondary;
    color: $primary;
  }
}
</style>
