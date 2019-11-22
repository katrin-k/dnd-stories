<template>
  <div>
    <h2 class="text-2xl">
      Neuer Ort
    </h2>
    <form>
      <label for="name">
        Name
      </label>
      <input id="name" v-model.lazy="place.name" type="text" name="name" />
      <label for="description">Beschreibung</label>
      <textarea
        id="description"
        v-model.lazy="place.description"
        name="description"
        rows="10"
      />
      <label for="localization">Lokalisierung</label>
      <input
        id="localization"
        v-model.lazy="place.localization"
        type="text"
        name="localization"
      />

      <ActionBar>
        <Button
          text="Ort speichern"
          type-submit
          @click.native.prevent="saveNewPlace"
        />
      </ActionBar>
    </form>
  </div>
</template>

<script>
import { Place } from '@/store/models/Place';
import Button from '../_shared/Button';
import ActionBar from '../_shared/ActionBar';

export default {
  name: 'PlacesNew',
  components: { Button, ActionBar },
  methods: {
    saveNewPlace() {
      Place.insert({
        data: this.place
      }).then(entities => {
        this.$router
          .push({
            name: 'places-detail',
            params: { id: entities.places[0].id }
          })
          .catch(() => {});
      });
    }
  }
};
</script>
