import { Database } from '@vuex-orm/core';
import Adventure from './Adventure';
import { Place, PlaceCategory } from './Place';
import { Item, ItemCategory, PlaceItem } from './Item';

const database = new Database();

database.register(Adventure);
database.register(Place);
database.register(PlaceCategory);
database.register(Item);
database.register(ItemCategory);
database.register(PlaceItem);

export default database;
