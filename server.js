const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'tomus',
    password: 'heslo',
    database: 'bflexdb'
  }
});

db.select('test_column').from('test')
  .then(data => console.log(data));