<template>
  <nav aria-label="Hauptmenü">
    <ul class="nav-main">
      <li>
        <router-link :to="{ name: 'landing-page' }" class="nav-main__link">
          Home
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'creatures-index' }" class="nav-main__link">
          Creatures
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'items-details', params: { id: 'init' } }"
          class="nav-main__link"
        >
          Items
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'places-detail', params: { id: 'init' } }"
          class="nav-main__link"
        >
          Orte
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'adventures-details', params: { id: 'init' } }"
          class="nav-main__link"
        >
          Adventures
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
};
</script>

<style lang="scss">
.nav-main {
  list-style: none;
  display: flex;
}

.nav-main__link {
  display: inline-block;
  padding: $sm-spacing $md-spacing;
  color: $secondary;
  font-size: $large-font-size;
  text-decoration: none;
  @include transition();

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}
</style>
