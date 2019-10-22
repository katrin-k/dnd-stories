<template>
  <main>
    <h1>Adventures Index</h1>
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
import { mapActions, mapState } from 'vuex';

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
      adventures: state => state.Adventure.adventures,
    })
  },
  methods: {
    ...mapActions([
      'adventureAddAction'
    ]),
    saveAdventure() {
      const payload = this.composeNewAdventure();
      this.adventureAddAction(payload);
      // this.$store.dispatch(
      //   'adventureAddAction',
      //   payload,
      // );
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
  },
};
</script>
