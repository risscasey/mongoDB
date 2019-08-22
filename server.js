const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config.json');

mongoose.connect(`mongodb+srv://RissCasey:${config.MONGO_PASSWORD}@firstcluster-89ezs.mongodb.net/shop?retryWrites=true&w=majority`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we on mongoose boiz');
});

const allProducts = require('./data/products');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function(req, res){
    res.send('Welcome to our Products API. Use endpoints to filter out the data');
});

app.get('/products', function(req, res){
    res.send(allProducts);
});

app.get('/products/id=:idNo', function(req, res){
  const IDParam = req.params.idNo;
  let filteredData = [];
  for (var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].id.toString() === IDParam){
      filteredData.push(allProducts[i]);
    }
  }
  res.send(filteredData);
});

app.get('/products/edit/id=:idNo', function(req, res){
  const IDParam = req.params.idNo;
  let filteredData = [];
  for (var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].id.toString() === IDParam){
        filteredData.push(allProducts[i]);
    }
  }
  res.send(filteredData);
});

app.get('/products/delete/id=:idNo', function(req, res){
  const IDParam = req.params.idNo;
  let filteredData = [];
  for (var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].id.toString() === IDParam){
        filteredData.push(allProducts[i]);
    }
  }
  res.send(filteredData);
});

const Product = require('./models/products');

app.post('/products', function(req, res){
  // console.log('post req made');
  // console.log(req.body);
  // let product = {
  //   name: req.body.name,
  //   price: req.body.price,
  //   message: 'about to sent this to DB'
  // }
  // res.send(product);

  const product = new Product ({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  console.log(product);

  product.save().then(result => {
    res.send(result);
  }).catch(err => res.send(err));
});

app.post('/contact', function(req, res){
  const user = new Product ({
    _id: new mongoose.Types.ObjectId(),
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
  });
  console.log(user);

  user.save().then(result => {
    res.send(result);
  }).catch(err => res.send(err));
});

app.listen(port, () => {
    console.log(`application is running on port ${port}`)
});
