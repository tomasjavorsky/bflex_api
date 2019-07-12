const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');
// --------------CONTROLLERS---------------------
const productCategories = require('./controllers/productCategories');

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

app.get('/productCategories', (req, res) => {productCategories.getProductCategories(req, res, db)});

app.listen(process.env.PORT || 3001);