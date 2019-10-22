<template>
  <nav aria-label="Hauptmenü">
    <ul class="nav-main">
      <li>
        <router-link :to="{ name: 'landing-page' }"
                     class="nav-main__link"
        >
          Home
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'beings-index' }"
                     class="nav-main__link"
        >
          Beings
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'things-index' }"
                     class="nav-main__link"
        >
          Things
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'places-index' }"
                     class="nav-main__link"
        >
          Orte
        </router-link>
      </li>
      <li>
        <router-link class="nav-main__link"
                     :to="{ name: 'adventures-index' }"
        >
          Adventures
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
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
