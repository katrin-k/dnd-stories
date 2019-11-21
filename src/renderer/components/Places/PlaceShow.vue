<template>
  <div>
    <h2 class="text-2xl">
      {{ place.name }}
    </h2>
    <h3>Beschreibung</h3>
    <p>{{ place.description }}</p>
    <h3>Lokalisierung</h3>
    <p>{{ place.localization }}</p>

    <h3 v-if="place.items.length > 0">Items an diesem Ort</h3>
    <RelatedDataList v-if="place.items.length > 0">
      <li v-for="item in place.items" :key="item.id" class="mr-1">
        <Button
          :text="item.name"
          tag-style
          @click.native="loadComponent($event, 'item-show', item.id)"
        />

        <Button text="X" @click.native="deleteItemRelation(item.id)" />
      </li>
    </RelatedDataList>

    <hr class="border-orange-900" />

    <ActionBar v-if="!slotId">
      <Button text="Ort löschen" @click.native="deletePlace(place.id)" />
    </ActionBar>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Place } from '@/store/models/Place';
import { PlaceItem } from '@/store/models/Item';
import Button from '../_shared/Button';
import ActionBar from '../_shared/ActionBar';
import RelatedDataList from '../_shared/RelatedDataList';

export default {
  name: 'PlaceShow',
  components: { Button, ActionBar, RelatedDataList },
  computed: {
    ...mapState({
      slotId: state => state.DynamicSlot.slotId
    }),
    place() {
      return Place.query()
        .with('items')
        .whereId(this.slotId ? this.slotId : this.$route.params.id)
        .first();
    }
  },
  methods: {
    ...mapActions(['dynamicSlotDisplayComponent']),
    deletePlace(id) {
      Place.delete(id);
      this.$router
        .push({ name: 'places-detail', params: { id: 'init' } })
        .catch(() => {});
    },
    deleteItemRelation(itemId) {
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
