import path from 'path';
import { remote } from 'electron';
import knex from 'knex';
import 'sqlite3';

const { app } = remote;

const database = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(app.getPath('userData'), 'dnd-stories.sqlite'),
  },
  useNullAsDefault: true,
});

database.schema.hasTable('adventures').then(exists => {
  if (!exists) {
    return database.schema.createTable('adventures', t => {
      t.increments('id');
      t.timestamps();
      t.integer('level');
      t.text('title', 'shorttext');
      t.text('introduction', 'longtext');
      t.text('background', 'longtext');
      t.text('notes', 'longtext');
    });
  }
});

export default database;
