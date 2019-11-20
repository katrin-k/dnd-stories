<template>
  <main>
    <h2 class="text-2xl">
      Adventures Details
    </h2>

    <div v-if="this.$route.params.id === 'init'">
      <p>Wähle ein Abenteuer aus.</p>
    </div>

    <div v-if="isEditing">
      <h2 v-if="this.$route.params.id === 'new'">
        New Adventure
      </h2>
      <h2 v-else>
        Bearbeite Abenteuer
      </h2>
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

        <ActionBar>
          <Button text="Abenteuer speichern"
                  type-submit
                  @click.native.prevent="handleSave"
          />
        </ActionBar>
      </form>
    </div>

    <div v-if="typeof this.$route.params.id === 'number'">
      <ActionBar>
        <Button text="Bearbeiten"
                @click.native="handleEditWish"
        />
        <Button text="Löschen"
                @click.native="handleDeleteWish(adventure.id)"
        />
      </ActionBar>

      <h2 class="text-2xl">
        {{ adventure.title }}
      </h2>
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
import Adventure from '@/store/models/Adventure'
import Button from '../_shared/Button'
import ActionBar from '../_shared/ActionBar'

export default {
  name: 'AdventuresShow',
  components: { Button, ActionBar },
  data() {
    return {
      adventure: null,
      isEditing: false
    };
  },
  beforeRouteUpdate: function(to, from, next) {
    if (to.params.id !== 'init') {
      this.fetchAdventure(to.params.id).then((response) => {
        this.adventure = response;
      },(error) => {
        console.error("Failed!", error);
      })
    }
    next()
  },
  beforeUpdate() {
    if (this.$route.params.id === 'new') {
      this.isEditing = true
    }
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
    handleSave() {
      if (this.$route.params.id === 'new') {
        this.saveNewAdventure()
      } else if (typeof this.$route.params.id === 'number') {
          this.updateAdventure()
      } else {
        // TODO: Display error on screen
        console.error('There was an error saving this adventure');
      }
      this.isEditing = false
    },
    saveNewAdventure() {
      this.adventure.$save(this.adventure);
    },
    updateAdventure() {
      // Adventure.dispatch('update', { data: this.adventure })
      // this.$store.dispatch('entities/adventures/update', this.adventure)
      // Adventure.update({ where: this.adventure.id , data: this.adventure })
      this.adventure.$update(this.adventure)
    },
    handleEditWish() {
      this.isEditing = true
    },
    handleDeleteWish(id) {
      Adventure.delete(id)
      this.$router.push({ name: 'adventures-details', params: { id: 'init' } }).catch(err => {})
    },
    loadComponent(event, componentName, id) {
      this.dynamicSlotDisplayComponent({
        componentName: componentName,
        slotId: id
      });
    },
  },
};


</script>
