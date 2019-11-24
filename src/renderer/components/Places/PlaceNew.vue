<template>
  <div>
    <ActionBar v-if="!isEditing">
      <Button text="Neuer Ort" @click.native="() => (isEditing = true)" />
    </ActionBar>

    <ActionBar v-else>
      <form>
        <label for="name">Name</label>
        <input id="name" v-model.lazy="place.name" type="text" name="name" />
        <Button text="Speichern" @click.native="saveNewPlace" />
        <Button text="Cancel" @click.native="resetForm" />
      </form>
    </ActionBar>
  </div>
</template>

<script>
import { Place } from '@/store/models/Place';
import Button from '../_shared/Button';
import ActionBar from '../_shared/ActionBar';

export default {
  name: 'PlaceNew',
  components: { Button, ActionBar },
  data() {
    return {
      isEditing: false,
      place: {}
    };
  },
  created() {
    this.place = this.createNewPlace();
  },
  methods: {
    saveNewPlace() {
      Place.insert({
        data: this.place
      }).then(entities => {
        this.resetForm();
        this.$router
          .push({
            name: 'places-detail',
            params: { id: entities.places[0].id, isEditing: true }
          })
          .catch(() => {});
      });
    },
    resetForm() {
      this.isEditing = false;
      this.place = this.createNewPlace();
    },
    createNewPlace() {
      return new Place();
    }
  }
};
</script>
