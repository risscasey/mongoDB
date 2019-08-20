const express = require('express');
const app = express();
const port = 3000;

const allProducts = require('./data/products');

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

app.get('/id=:idNo', function(req, res){
  const idNoParam = req.params.idNo;
  console.log(idNoParam);

  // let requestedID = [];
  // for (var i = 0; i < allProducts.length; i++) {
  //   if (idNoParam == allProducts[i].id) {
  //     requestedID.push(allProducts[i]);
  //   } else {
  //     console.log('Sorry that was not a valid ID');
  //   }
  // }
  // res.send(requestedID);
});

app.listen(port, () => {
    console.log(`application is running on port ${port}`)
});
