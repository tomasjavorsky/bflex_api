const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const bcrypt      = require('bcrypt');
const knex        = require('knex');

// --------------CONTROLLERS---------------------
const productCategories = require('./controllers/productCategories');
const products = require('./controllers/products');

// --------------SETUP---------------------
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

// --------------ROUTES---------------------
app.get   ('/productCategories', (req, res) => {productCategories.getProductCategories(req, res, db)});
app.post  ('/productCategories', (req, res) => {productCategories.addProductCategory(req, res, db)});
app.delete('/productCategories', (req, res) => {productCategories.removeProductCategory(req, res, db)});
app.get   ('/products', (req, res) => {products.getProducts(req, res, db)});
app.post  ('/products', (req, res) => {products.addProduct(req, res, db)});
app.delete('/products', (req, res) => {products.removeProduct(req, res, db)});

app.listen(process.env.PORT || 3001);