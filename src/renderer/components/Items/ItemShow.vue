<template>
  <div>
    <ActionBar>
      <Button text="Item löschen"
              @click.native="handleDeleteWish(item.id)"
      />
    </ActionBar>

    <h2 class="text-2xl">
      {{ item.name }} | {{ item.id }}
    </h2>
    <h3>Beschreibung</h3>
    <p>{{ item.description }}</p>
    <h3>Lokalisierung</h3>
    <p>{{ item.localization }}</p>
    <h3>Kategorie</h3>
    <p v-if="itemCategory">
      {{ item.category_id }} - {{ itemCategory.name }}
    </p>

    <h3>Verwandte Orte</h3>
    <RelatedDataList v-if="item.places.length > 0">
      <li v-for="place in item.places"
          :key="place.id"
          class="mr-1"
      >
        <Button :text="place.name"
                tag-style
                @click.native="loadComponent($event, 'place-show', place.id)"
        />
      </li>
    </RelatedDataList>

    <ActionBar>
      <Button v-if="!editingPlace"
              text="Ort hinzufügen"
              @click.native="showAddPlace"
      />
      <multiselect v-else
                   placeholder="Please select..."
                   :value="item.places"
                   :options="places"
                   track-by="id"
                   label="name"
                   clear-on-select
                   @input="addPlacetoItem"
      />
    </ActionBar>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Item, ItemCategory, PlaceItem } from '@/models/Item'
import { Place } from '@/models/Place'
import Button from '../_shared/Button'
import ActionBar from '../_shared/ActionBar'
import RelatedDataList from '../_shared/RelatedDataList'

export default {
  name: 'ItemShow',
  components: { Button, ActionBar, RelatedDataList },
  data() {
    return {
      editingPlace: false
    };
  },
  computed: {
    item() {
      return Item.find(this.$route.params.id)
    },
    itemCategory() {
      const name = ItemCategory.query().whereId(parseInt(this.item.category_id)).get()
      return name[0]
    },
    places() {
      return Place.all()
    },
  },
  methods: {
    ...mapActions([
      'dynamicSlotDisplayComponent'
    ]),
    handleDeleteWish(id) {
      Item.delete(id)
      this.$router.push({ name: 'items-details', params: { id: 'init' } }).catch(err => {})
    },
    showAddPlace() {
      this.editingPlace = true
    },
    handleAddPlace() {
      Item.update({
        data: this.item
      }).then(entities => {
        this.editingPlace = false
      })
    },
    addPlacetoItem(newPlace){
      const prevPlaces = this.item.places

      Item.update({
        where: this.item.id,
        data: {
          places: [...prevPlaces, newPlace]
        }
      }).then(entities => {
        this.editingPlace = false
        this.$router.push({ name: 'items-details', params: { id: this.item.id } }).catch(err => {})
      })
    },
    loadComponent(event, componentName, id) {
      this.dynamicSlotDisplayComponent({
        componentName: componentName,
        slotId: id
      });
    },
  },
}
</script>
