<template>
  <div>
    <h2 class="text-2xl">
      Neues Item
    </h2>
    <form>
      <label for="name">
        Name
      </label>
      <input id="name" v-model.lazy="item.name" type="text" name="name" />
      <label for="description">Beschreibung</label>
      <textarea
        id="description"
        v-model.lazy="item.description"
        name="description"
        rows="10"
      />
      <label for="quantity">Anzahl</label>
      <input
        id="quantity"
        v-model.lazy="item.quantity"
        type="text"
        name="quantity"
      />
      <label for="is_collected">Ist eingesammelt?</label>
      <input
        id="is_collected"
        v-model.lazy="item.is_collected"
        type="checkbox"
        name="is_collected"
      />

      <!-- TODO: check for required -->
      <multiselect
        :value="item.category_id"
        :options="itemCategories"
        placeholder="Please select..."
        track-by="item_cat_id"
        label="name"
        @input="handleCategorySelect"
      />

      <ActionBar>
        <Button
          text="Item speichern"
          type-submit
          @click.native.prevent="saveNewItem"
        />
      </ActionBar>
    </form>
  </div>
</template>

<script>
import { Item, ItemCategory } from '@/store/models/Item';
import Button from '../_shared/Button';
import ActionBar from '../_shared/ActionBar';

export default {
  name: 'ItemNew',
  components: { Button, ActionBar },
  computed: {
    item: {
      get: function() {
        return new Item();
      },
      set: function(newValue) {
        this.item.category_id = newValue;
        return this.item;
      }
    },
    itemCategories() {
      return ItemCategory.all();
    }
  },
  methods: {
    saveNewItem() {
      Item.insertOrUpdate({
        data: this.item
      }).then(entities => {
        this.$router
          .push({ name: 'items-details', params: { id: entities.items[0].id } })
          .catch(() => {});
      });
    },
    handleCategorySelect(object) {
      this.item = object.item_cat_id.toString();
    }
  }
};
</script>
