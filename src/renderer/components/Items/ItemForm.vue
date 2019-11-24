<template>
  <form>
    <label for="name">
      Name
    </label>
    <input id="name" v-model.lazy="item.name" type="text" name="name" />
    <label for="description">Beschreibung</label>
    <textarea
      id="description"
      v-model.lazy="editedItem.description"
      name="description"
      rows="10"
    />
    <label for="quantity">Anzahl</label>
    <input
      id="quantity"
      v-model.lazy="editedItem.quantity"
      type="text"
      name="quantity"
    />
    <label for="is_collected">Ist eingesammelt?</label>
    <input
      id="is_collected"
      v-model.lazy="editedItem.is_collected"
      type="checkbox"
      name="is_collected"
    />

    <label for="category">Kategorie</label>
    <multiselect
      :value="editedItem.category"
      :options="itemCategories"
      name="category"
      placeholder="Please select..."
      track-by="item_cat_id"
      label="name"
      @input="handleCategorySelect"
    />

    <ActionBar>
      <Button
        text="Item speichern"
        button-type="submit"
        @click.native.prevent="updateItem"
      />
    </ActionBar>
  </form>
</template>

<script>
import { Item, ItemCategory } from '@/store/models/Item';
import Button from '../_shared/Button';
import ActionBar from '../_shared/ActionBar';

export default {
  name: 'ItemForm',
  components: { Button, ActionBar },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    editedItem() {
      return this.item;
    },
    itemCategories() {
      return ItemCategory.all();
    }
  },
  watch: {
    item() {}
  },
  methods: {
    handleCategorySelect(object) {
      this.editedItem.category_id = object.item_cat_id.toString();
      Item.insertOrUpdate({
        data: {
          ...this.editedItem,
          category_id: object.item_cat_id.toString()
        }
      });
    },
    updateItem() {
      Item.insertOrUpdate({
        data: {
          ...this.editedItem
        }
      }).then(() => {
        this.$emit('change-edit-state');
      });
    }
  }
};
</script>
