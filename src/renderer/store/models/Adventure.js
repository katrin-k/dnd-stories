import { Model } from '@vuex-orm/core';
import { Place, AdvPlace } from './Place';

export default class Adventure extends Model {
  static entity = 'adventures';

  static fields() {
    return {
      id: this.increment(),
      title: this.string(''),
      level: this.number(1),
      introduction: this.string(''),
      background: this.string(''),
      notes: this.string(''),
      places: this.belongsToMany(Place, AdvPlace, 'adv_id', 'place_id')
    };
  }
}
