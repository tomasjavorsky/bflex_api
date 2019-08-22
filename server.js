const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const bcrypt      = require('bcrypt');
const knex        = require('knex');

// --------------CONTROLLERS---------------------
const productCategories = require('./controllers/productCategories');
const products = require('./controllers/products');
const mailer = require('./controllers/mailer');
const jobListings = require('./controllers/jobListings');
const downloadFiles = require('./controllers/downloadFiles');
const user = require('./controllers/user');

// --------------SETUP---------------------
let user_login = "";
let user_password = "";
setUser = (login, password) => {
  user_login = login;
  user_password = password;
};
this.setUser = this.setUser.bind(this);
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

user.checkLogin(req, res,"bflexAdministrator","$2a$10$iH1IpBAPu6owcKpDASBwD.K.6ov85syxg4UVOxHgtMqxsuVvNfuFW", db).then(data => console.log(data))

// --------------ROUTES---------------------
app.get   ('/productCategories', (req, res) => {productCategories.getProductCategories(req, res, db)});
app.post  ('/productCategories', (req, res) => {productCategories.addProductCategory(req, res, db)});
app.delete('/productCategories', (req, res) => {productCategories.removeProductCategory(req, res, db)});
app.get   ('/products', (req, res) => {products.getProducts(req, res, db)});
app.post  ('/products', (req, res) => {products.addProduct(req, res, db)});
app.delete('/products', (req, res) => {products.removeProduct(req, res, db)});
app.post  ('/sendOrder', (req, res) => {mailer.sendMail(req, res)});
app.get   ('/jobListings', (req, res) => {jobListings.getJobs(req, res, db)});
app.post  ('/jobListings', (req, res) => {jobListings.addJob(req, res, db)});
app.delete('/jobListings', (req, res) => {jobListings.removeJob(req, res, db)});
app.get   ('/downloadFiles', (req, res) => {downloadFiles.getFiles(req, res, db)});
app.post  ('/downloadFiles', (req, res) => {downloadFiles.addFile(req, res, db)});
app.delete('/downloadFiles', (req, res) => {downloadFiles.removeFile(req, res, db)});
app.post  ('/user', (req, res) => {user.userLogin(req, res, db, setUser)});

app.listen(process.env.PORT || 3001);