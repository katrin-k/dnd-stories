<template>
  <main>
    <h1>Adventures Single</h1>
    <!-- <div>
      <ul>
        <li>
          <button @click="loadComponent($event, 'test-slot-one')">
            display test slot one (eg a room)
          </button>
        </li>
        <li>
          <button @click="loadComponent($event, 'test-slot-two')">
            display test slot two (eg a treasure)
          </button>
        </li>
      </ul>
    </div> -->

    <div v-if="this.$route.params.id === 'init'">
      <p>Wähle ein Abenteuer aus.</p>
    </div>

    <div v-if="this.$route.params.id === 'new'">
      <h2>New Adventure</h2>
      <form>
        <label for="title">
          Title
        </label>
        <input id="title"
               v-model.lazy="newAdventure.title"
               type="text"
               name="title"
        >
        <label for="level">
          Level
        </label>
        <input id="level"
               v-model.lazy="newAdventure.level"
               type="text"
               name="level"
        >
        <label for="introduction">Introduction</label>
        <textarea
          id="introduction"
          v-model.lazy="newAdventure.intro"
          name="introduction"
          rows="10"
        />
        <label for="background">Background</label>
        <textarea
          id="background"
          v-model.lazy="newAdventure.background"
          name="background"
          rows="10"
        />
        <label for="notes">Notes</label>
        <textarea
          id="notes"
          v-model.lazy="newAdventure.notes"
          name="notes"
          rows="10"
        />
        <input type="submit"
               value="Save adventure"
               @click.prevent="saveAdventure"
        >
      </form>
    </div>

    <div v-if="typeof this.$route.params.id === 'number'">
      <h2>Existing adventure</h2>
      <h2>{{ adventure.title }}</h2>
      <p>Level: {{ adventure.level }}</p>
      <h3>Introduction</h3>
      <p>{{ adventure.intro }}</p>
      <h3>Background</h3>
      <p>{{ adventure.background }}</p>
      <h3>Notes</h3>
      <p>{{ adventure.notes }}</p>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import Adventure from '@/models/Adventure'

export default {
  name: 'AdventuresSingle',
  props: {
    adventure: {
      type: Object,
      default() {
        return {}
      },
      required: false
    }
  },
  data() {
    return {
      newAdventure: null,
      // adventure: null
    };
  },
  // beforeRouteEnter (to, from, next) {
  //   if (to.params.id === 'new') {
  //     this.newAdventure = new Adventure()
  //   } else if (typeof to.params.id === 'number') {
  //     this.adventure = Adventure.find(this.$route.params.id)
  //     console.log('this.adventure', this.adventure);
  //   }
  //   next()
  // },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('typeof to.params.id', typeof to.params.id);
  //   if (to.params.id === 'new') {
  //     this.newAdventure = new Adventure()
  //   } else if (typeof to.params.id === 'number') {
  //     this.adventure = Adventure.find(this.$route.params.id)
  //     console.log('this.adventure', this.adventure);
  //   }
  //   next()
  // },
  methods: {
    ...mapActions([
      'asideRightDisplayComponent'
    ]),
    saveAdventure() {
      this.newAdventure.$save(this.newAdventure);
    },
    loadComponent(event, componentName) {
      this.asideRightDisplayComponent(componentName);
    },
  },
};


</script>
