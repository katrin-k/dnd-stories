import { Model } from '@vuex-orm/core'

export default class Adventure extends Model {
  static entity = 'adventures'

  static fields() {
    return {
      id: this.increment(),
      title: this.string(null),
      level: this.number(null),
      introduction: this.string(null),
      background: this.string(null),
      notes: this.string(null),
    }
  }
}
