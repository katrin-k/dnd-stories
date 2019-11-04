import { Database } from '@vuex-orm/core'
import Adventure from './Adventure'
import { Place, PlaceCategory } from './Place'
import { Item, ItemCategory } from './Item'

const database = new Database()

database.register(Adventure)
database.register(Place)
database.register(PlaceCategory)
database.register(Item)
database.register(ItemCategory)

export default database
