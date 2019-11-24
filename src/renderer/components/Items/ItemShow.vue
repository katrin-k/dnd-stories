<template>
  <div>
    <h2 class="text-2xl">{{ item.name }} | {{ item.id }}</h2>

    <ActionBar v-if="!slotMode">
      <Button
        v-if="!isEditing"
        text="Item bearbeiten"
        @click.native="handleEditItem"
      />
      <Button
        v-else
        text="Item bearbeiten abbrechen"
        @click.native="handleEditItem"
      />
    </ActionBar>

    <ItemForm
      v-if="isEditing"
      :item="item"
      @change-edit-state="handleEditItem"
    />
    <div v-else>
      <h3>Beschreibung</h3>
      <p>{{ item.description }}</p>
      <h3>Lokalisierung</h3>
      <p>{{ item.localization }}</p>
      <h3>Kategorie</h3>
      <p v-if="item.category_id">
        {{ item.category_id }} - {{ item.category.name }}
      </p>
    </div>

    <h3>Verwandte Orte</h3>
    <RelatedDataList v-if="item.places.length > 0">
      <li v-for="place in item.places" :key="place.id" class="mr-1">
        <Button
          :text="place.name"
          tag-style
          @click.native="loadComponent($event, 'place-show', place.id)"
        />

        <Button text="X" @click.native="deletePlaceRelation(place.id)" />
      </li>
    </RelatedDataList>

    <ActionBar>
      <Button
        v-if="!editingPlace"
        text="Ort hinzufügen"
        @click.native="showAddPlace"
      />
      <multiselect
        v-else
        placeholder="Please select..."
        :value="item.places"
        :options="places"
        track-by="id"
        label="name"
        clear-on-select
        @input="addPlacetoItem"
      />
    </ActionBar>

    <hr class="border-orange-900" />

    <ActionBar v-if="!slotMode">
      <Button text="Item löschen" @click.native="handleDeleteItem(item.id)" />
    </ActionBar>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Item, PlaceItem } from '@/store/models/Item';
import { Place } from '@/store/models/Place';
import Button from '../_shared/Button';
import ActionBar from '../_shared/ActionBar';
import RelatedDataList from '../_shared/RelatedDataList';
import ItemForm from './ItemForm';

export default {
  name: 'ItemShow',
  components: { ItemForm, Button, ActionBar, RelatedDataList },
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
      editingPlace: false
    };
  },
  computed: {
    item() {
      return Item.query()
        .withAll()
        .whereId(this.slotMode ? this.slotId : this.$route.params.id)
        .first();
    },
    places() {
      return Place.all();
    }
  },
  created() {
    if (this.$route.params.isEditing) {
      this.isEditing = true;
    }
  },
  methods: {
    ...mapActions(['dynamicSlotDisplayComponent']),
    handleDeleteItem(itemId) {
      this.item.places.length > 0 &&
        this.item.places.forEach(relatedPlace =>
          this.deletePlaceRelation(relatedPlace.id)
        );
      this.deleteItem(itemId);
    },
    deleteItem(id) {
      Item.delete(id);
      this.$router
        .push({ name: 'items-details', params: { id: 'init' } })
        .catch(() => {});
    },
    deletePlaceRelation(placeId) {
      PlaceItem.delete([placeId, this.item.id]);
    },
    showAddPlace() {
      this.editingPlace = true;
    },
    addPlacetoItem(newPlace) {
      const prevPlaces = this.item.places;

      Item.insertOrUpdate({
        data: {
          ...this.item,
          places: [...prevPlaces, newPlace]
        }
      }).then(() => {
        this.editingPlace = false;
      });
    },
    handleEditItem() {
      this.isEditing = !this.isEditing;
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
