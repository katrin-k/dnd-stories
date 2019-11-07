import { Model } from '@vuex-orm/core'

export class ItemCategory extends Model {
  static entity = 'itemCategory'

  static primaryKey = 'item_cat_id'

  static fields() {
    return {
      item_cat_id: this.increment(),
      name: this.string(''),
      items: this.hasMany(Item, 'category_id')
    }
  }
}

export class Item extends Model {
  static entity = 'items'

  static fields() {
    return {
      id: this.increment(),
      name: this.string('default name'),
      description: this.string(''),
      quantity: this.number(1),
      is_collected: this.boolean(false),
      // FK of IC
      category_id: this.string(null),
      category: this.belongsTo(ItemCategory, 'category_id'),
    }
  }
}
