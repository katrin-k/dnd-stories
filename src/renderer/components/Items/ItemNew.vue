<template>
  <div>
    <ActionBar v-if="!isEditing">
      <Button text="New Item" @click.native="() => (isEditing = true)" />
    </ActionBar>

    <ActionBar v-else>
      <form>
        <label for="name">Name</label>
        <input id="name" v-model.lazy="item.name" type="text" name="name" />
        <Button text="Speichern" @click.native="saveNewItem" />
        <Button text="Cancel" @click.native="handleCancel" />
      </form>
    </ActionBar>
  </div>
</template>

<script>
import { Item } from '@/store/models/Item';
import ActionBar from '../_shared/ActionBar';
import Button from '../_shared/Button';

export default {
  name: 'ItemNew',
  components: { ActionBar, Button },
  data() {
    return {
      isEditing: false,
      item: {}
    };
  },
  created() {
    this.item = this.createNewItem();
  },
  methods: {
    saveNewItem() {
      Item.insertOrUpdate({
        data: this.item
      }).then(entities => {
        this.isEditing = false;
        this.item = this.createNewItem();
        this.$router
          .push({
            name: 'items-details',
            params: { id: entities.items[0].id, isEditing: true }
          })
          .catch(() => {});
      });
    },
    handleCancel() {
      this.isEditing = false;
      this.item = this.createNewItem();
    },
    createNewItem() {
      return new Item();
    }
  }
};
</script>
