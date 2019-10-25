import { Model } from '@vuex-orm/core'

export default class Adventure extends Model {
  static entity = 'adventures'

  static fields() {
    return {
      id: this.increment(),
      title: this.string(''),
      level: this.number(1),
      introduction: this.string(''),
      background: this.string(''),
      notes: this.string(''),
    }
  }
}
