import { Model } from '@vuex-orm/core'
import Adventure from './Adventure'

export class PlaceCategory extends Model {
  static entity = 'placeCategory'

  static fields() {
    return {
      place_cat_id: this.increment(),
      name: this.string(''),
      places: this.hasMany(Place, 'category_id')
    }
  }
}

export class AdvPlace extends Model {
  static entity = 'advPlace'

  static primaryKey = ['adv_id', 'place_id']

  static fields() {
    return {
      adv_id: this.attr(null),
      place_id: this.attr(null)
    }
  }
}

export class Place extends Model {
  static entity = 'places'

  static fields() {
    return {
      id: this.increment(),
      name: this.string(''),
      description: this.string(null),
      localization: this.string(null),
      category_id: this.string(null),
      adventures: this.belongsToMany(Adventure, AdvPlace, 'place_id', 'adv_id')
    }
  }
}
