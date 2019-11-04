import { Model } from '@vuex-orm/core'

export class ItemCategory extends Model {
  static entity = 'itemCategory'

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
      name: this.string(''),
      description: this.string(null),
      quantity: this.number(1),
      is_collected: this.boolean(false),
      category_id: this.string(null),
    }
  }
}
