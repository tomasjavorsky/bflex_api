const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const knex        = require('knex');

// --------------CONTROLLERS---------------------
const productCategories = require('./controllers/productCategories');
const products = require('./controllers/products');
const mailer = require('./controllers/mailer');
const jobListings = require('./controllers/jobListings');
const downloadFiles = require('./controllers/downloadFiles');
const user = require('./controllers/user');
const contactInfo = require('./controllers/contactInfo');
const gdprText = require('./controllers/gdprText');

// --------------SETUP---------------------

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

// --------------ROUTES---------------------
app.get   ('/',                   (req, res) => {res.send("Bflex api running")});
app.get   ('/productCategories',  (req, res) => {productCategories.getProductCategories(req, res, db)});
app.post  ('/productCategories',  (req, res) => {productCategories.addProductCategory(req, res, db)});
app.delete('/productCategories',  (req, res) => {productCategories.removeProductCategory(req, res, db)});
app.put   ('/productCategories',  (req, res) => {productCategories.adjustCategoryOrder(req, res, db)});
app.get   ('/products',           (req, res) => {products.getProducts(req, res, db)});
app.post  ('/products',           (req, res) => {products.addProduct(req, res, db)});
app.delete('/products',           (req, res) => {products.removeProduct(req, res, db)});
app.put   ('/products',           (req, res) => {products.adjustProductOrder(req, res, db)});
app.post  ('/sendOrder',          (req, res) => {mailer.sendMail(req, res)});
app.get   ('/jobListings',        (req, res) => {jobListings.getJobs(req, res, db)});
app.post  ('/jobListings',        (req, res) => {jobListings.addJob(req, res, db)});
app.delete('/jobListings',        (req, res) => {jobListings.removeJob(req, res, db)});
app.get   ('/contacts',           (req, res) => {contactInfo.getContacts(req, res, db)});
app.post  ('/contacts',           (req, res) => {contactInfo.addContact(req, res, db)});
app.delete('/contacts',           (req, res) => {contactInfo.removeContact(req, res, db)});
app.get   ('/downloadFiles',      (req, res) => {downloadFiles.getFiles(req, res, db)});
app.post  ('/downloadFiles',      (req, res) => {downloadFiles.addFile(req, res, db)});
app.delete('/downloadFiles',      (req, res) => {downloadFiles.removeFile(req, res, db)});
app.put   ('/downloadFiles',      (req, res) => {downloadFiles.adjustFileOrder(req, res, db)});
app.post  ('/user',               (req, res) => {user.checkLogin(req, res)});
app.get   ('/categoryImages',     (req, res) => {products.getEachCategoryImages(req, res, db)});
app.get   ('/gdprText',           (req, res) => {gdprText.getGdprText(req, res, db)});

app.listen(process.env.PORT || 3001);