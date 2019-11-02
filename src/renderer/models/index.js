import { Database } from '@vuex-orm/core'
import Adventure from './Adventure'
import { Place, PlaceCategory } from './Place'

const database = new Database()

database.register(Adventure)
database.register(Place)
database.register(PlaceCategory)

export default database
