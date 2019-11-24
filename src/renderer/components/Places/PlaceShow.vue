<template>
  <div>
    <h2 class="text-2xl">{{ place.name }}</h2>

    <ActionBar v-if="!slotMode">
      <Button
        v-if="!isEditing"
        text="Ort bearbeiten"
        @click.native="handleEditPlace"
      />
      <Button
        v-else
        text="Ort bearbeiten abbrechen"
        @click.native="handleEditPlace"
      />
    </ActionBar>

    <PlaceForm
      v-if="isEditing"
      :place="place"
      @change-edit-state="handleEditPlace"
    />
    <div v-else>
      <h3>Beschreibung</h3>
      <p>{{ place.description }}</p>
      <h3>Lokalisierung</h3>
      <p>{{ place.localization }}</p>
    </div>

    <h3>Items an diesem Ort</h3>
    <RelatedDataList v-if="place.items.length > 0">
      <li v-for="item in place.items" :key="item.id" class="mr-1">
        <Button
          :text="item.name"
          tag-style
          @click.native="loadComponent($event, 'item-show', item.id)"
        />

        <Button text="X" @click.native="deletePlaceItemRelation(item.id)" />
      </li>
    </RelatedDataList>

    <ActionBar>
      <Button
        v-if="!editingItem"
        text="Item hinzufügen"
        @click.native="showAddItem"
      />
      <multiselect
        v-else
        placeholder="Please select..."
        :value="place.items"
        :options="items"
        track-by="id"
        label="name"
        clear-on-select
        @input="addPlaceItemRelation"
      />
    </ActionBar>

    <hr class="border-orange-900" />

    <ActionBar v-if="!slotMode">
      <Button text="Ort löschen" @click.native="handleDeletePlace(place.id)" />
    </ActionBar>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Place } from '@/store/models/Place';
import { Item, PlaceItem } from '@/store/models/Item';
import Button from '../_shared/Button';
import ActionBar from '../_shared/ActionBar';
import RelatedDataList from '../_shared/RelatedDataList';
import PlaceForm from './PlaceForm';

export default {
  name: 'PlaceShow',
  components: { PlaceForm, Button, ActionBar, RelatedDataList },
  props: {
    slotId: {
      type: Number,
      default: null
    },
    slotMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isEditing: false,
      editingItem: false
    };
  },
  computed: {
    place() {
      return Place.query()
        .withAll()
        .whereId(this.slotMode ? this.slotId : this.$route.params.id)
        .first();
    },
    items() {
      return Item.all();
    }
  },
  created() {
    if (this.$route.params.isEditing) {
      this.isEditing = true;
    }
  },
  methods: {
    ...mapActions(['dynamicSlotDisplayComponent']),
    handleEditPlace() {
      this.isEditing = !this.isEditing;
    },
    handleDeletePlace(placeId) {
      this.place.items.length > 0 &&
        this.place.items.forEach(relatedItem =>
          this.deletePlaceItemRelation(relatedItem.id)
        );
      this.deletePlace(placeId);
    },
    deletePlace(id) {
      Place.delete(id);
      this.$router
        .push({ name: 'places-detail', params: { id: 'init' } })
        .catch(() => {});
    },
    showAddItem() {
      this.editingItem = true;
    },
    addPlaceItemRelation(newItem) {
      const prevItems = this.place.items;

      Place.insertOrUpdate({
        data: {
          ...this.place,
          items: [...prevItems, newItem]
        }
      }).then(() => {
        this.editingItem = false;
      });
    },
    deletePlaceItemRelation(itemId) {
      PlaceItem.delete([this.place.id, itemId]);
    },
    loadComponent(event, componentName, id) {
      this.dynamicSlotDisplayComponent({
        componentName: componentName,
        slotId: id
      });
    }
  }
};
</script>
