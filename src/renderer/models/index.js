import { Database } from '@vuex-orm/core'
import Adventure from './Adventure'

const database = new Database()

database.register(Adventure)

export default database
