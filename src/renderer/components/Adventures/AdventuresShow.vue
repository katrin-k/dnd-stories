<template>
  <main>
    <h1>Adventures Show</h1>

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
               v-model.lazy="adventure.title"
               type="text"
               name="title"
        >
        <label for="level">
          Level
        </label>
        <input id="level"
               v-model.lazy="adventure.level"
               type="text"
               name="level"
        >
        <label for="introduction">Introduction</label>
        <textarea
          id="introduction"
          v-model.lazy="adventure.intro"
          name="introduction"
          rows="10"
        />
        <label for="background">Background</label>
        <textarea
          id="background"
          v-model.lazy="adventure.background"
          name="background"
          rows="10"
        />
        <label for="notes">Notes</label>
        <textarea
          id="notes"
          v-model.lazy="adventure.notes"
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
      <h3>Ort:</h3>
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
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import Adventure from '@/models/Adventure'

export default {
  name: 'AdventuresShow',
  data() {
    return {
      adventure: null
    };
  },
  beforeRouteUpdate: function(to, from, next) {
    this.fetchAdventure(to.params.id).then((response) => {
      this.adventure = response;
      next()
    },(error) => {
      console.error("Failed!", error);
    })
  },
  methods: {
    ...mapActions([
      'dynamicSlotDisplayComponent'
    ]),
    fetchAdventure(id) {
      return new Promise( (resolve, reject) => {
        let adv;
        (id === 'new')
          ? adv = new Adventure()
          : adv = Adventure.find(id);
        if (adv) {
          resolve(adv);
        }
        else {
          reject(Error("It broke"));
        }
      })
    },
    saveAdventure() {
      this.adventure.$save(this.adventure);
    },
    loadComponent(event, componentName) {
      this.dynamicSlotDisplayComponent(componentName);
    },
  },
};


</script>
