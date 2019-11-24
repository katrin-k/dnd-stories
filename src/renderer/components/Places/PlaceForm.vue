<template>
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
        button-type="submit"
        @click.native.prevent="updateItem"
      />
    </ActionBar>
  </form>
</template>

<script>
import { Place } from '@/store/models/Place';
import Button from '../_shared/Button';
import ActionBar from '../_shared/ActionBar';

export default {
  name: 'PlaceForm',
  components: { Button, ActionBar },
  props: {
    place: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  // computed: {
  //   editedPlace() {
  //     return this.place;
  //   }
  // },
  // watch: {
  //   place() {}
  // },
  methods: {
    updateItem() {
      Place.insertOrUpdate({
        data: {
          ...this.place
        }
      }).then(() => {
        this.$emit('change-edit-state');
      });
    }
  }
};
</script>
