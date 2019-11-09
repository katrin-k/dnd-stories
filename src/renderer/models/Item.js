import { Model } from '@vuex-orm/core'
import { Place } from './Place'

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
      category: this.belongsTo(ItemCategory, 'category_id', 'item_cat_id'),
      places: this.belongsToMany(Place, PlaceItem, 'place_id', 'item_id')
    }
  }
}

export class PlaceItem extends Model {
  static entity = 'placeItem'

  static primaryKey = ['place_id', 'item_id']

  static fields() {
    return {
      place_id: this.attr(null),
      item_id: this.attr(null),
    }
  }

}
