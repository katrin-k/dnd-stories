import { Model } from '@vuex-orm/core'

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

export class Place extends Model {
  static entity = 'places'

  static fields() {
    return {
      id: this.increment(),
      name: this.string(''),
      description: this.string(null),
      localization: this.string(null),
      category_id: this.string(null),
    }
  }
}
