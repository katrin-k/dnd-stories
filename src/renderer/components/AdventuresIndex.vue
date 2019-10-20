<template>
  <main>
    <h1>Adventures Index</h1>
    <h2>New Adventure</h2>
    <form>
      <label for="title">
        Title
        <input id="title"
               v-model.lazy="newAdventureTitle"
               type="text"
               name="title"
        >
      </label>
      <label for="level">
        Level
        <input id="level"
               v-model.lazy="newAdventureLevel"
               type="text"
               name="level"
        >
      </label>
      <label for="introduction">Introduction</label>
      <textarea
        id="introduction"
        v-model.lazy="newAdventureIntro"
        name="introduction"
        cols="30"
        rows="10"
      />
      <label for="background">Background</label>
      <textarea
        id="background"
        v-model.lazy="newAdventureBackground"
        name="background"
        cols="30"
        rows="10"
      />
      <label for="notes">Notes</label>
      <textarea id="notes"
                v-model.lazy="newAdventureNotes"
                name="notes"
                cols="30"
                rows="10"
      />
      <input type="submit"
             value="Save adventure"
             @click="saveAdventure"
      >
    </form>

    <section>
      <h2>All adventures</h2>
      <ul>
        <li v-for="item in adventures"
            :key="item.id"
            @click="loadItem(item)"
        >
          {{ item.title }}
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdventuresIndex',
  data() {
    return {
      newAdventureLevel: '',
      newAdventureTitle: '',
      newAdventureIntro: '',
      newAdventureBackground: '',
      newAdventureNotes: '',
    };
  },
  computed: {
    ...mapState({
      adventures: state => state.adventures,
    }),
  },
  methods: {
    saveAdventure() {
      this.$store.dispatch(
        'adventureAddAction',
        this.composeNewAdventure(),
      );
      this.newAdventureLevel = '';
      this.newAdventureTitle = '';
      this.newAdventureIntro = '';
      this.newAdventureBackground = '';
      this.newAdventureNotes = '';
    },
    composeNewAdventure() {
      return {
        level: this.newAdventureLevel,
        title: this.newAdventureTitel,
        introduction: this.newAdventureIntro,
        background: this.newAdventureBackground,
        notes: this.newAdventureNotes,
      };
    },
  },
};
</script>
