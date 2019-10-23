<template>
  <main>
    <h1>Adventures Single</h1>
    <div>
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
    <h2>New Adventure</h2>
    <form>
      <label for="title">
        Title
      </label>
      <input id="title"
             v-model.lazy="newAdventureTitle"
             type="text"
             name="title"
      >
      <label for="level">
        Level
      </label>
      <input id="level"
             v-model.lazy="newAdventureLevel"
             type="text"
             name="level"
      >
      <label for="introduction">Introduction</label>
      <textarea
        id="introduction"
        v-model.lazy="newAdventureIntro"
        name="introduction"
        rows="10"
      />
      <label for="background">Background</label>
      <textarea
        id="background"
        v-model.lazy="newAdventureBackground"
        name="background"
        rows="10"
      />
      <label for="notes">Notes</label>
      <textarea
        id="notes"
        v-model.lazy="newAdventureNotes"
        name="notes"
        rows="10"
      />
      <input type="submit"
             value="Save adventure"
             @click.prevent="saveAdventure"
      >
    </form>
  </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AdventuresSingle',
  data() {
    return {
      newAdventureLevel: '',
      newAdventureTitle: '',
      newAdventureIntro: '',
      newAdventureBackground: '',
      newAdventureNotes: '',
    };
  },
  methods: {
    ...mapActions([
      'adventureAddAction',
      'asideRightDisplayComponent'
    ]),
    saveAdventure() {
      const payload = this.composeNewAdventure();
      this.adventureAddAction(payload);
      this.newAdventureLevel = '';
      this.newAdventureTitle = '';
      this.newAdventureIntro = '';
      this.newAdventureBackground = '';
      this.newAdventureNotes = '';
    },
    composeNewAdventure() {
      return {
        level: this.newAdventureLevel,
        title: this.newAdventureTitle,
        introduction: this.newAdventureIntro,
        background: this.newAdventureBackground,
        notes: this.newAdventureNotes,
      };
    },
    loadComponent(event, componentName) {
      this.asideRightDisplayComponent(componentName);
    }
  },
};
</script>
