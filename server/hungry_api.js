var express     = require('express');
var bodyParser  = require('body-parser');
var cors        = require('cors')
var app         = express();
var mongodb     = require('mongodb');
var path        = require('path');

const MongoClient = require('mongodb').MongoClient;

app.use(express.static(path.resolve(__dirname, '../react', 'build')));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname, '../react', 'build', 'index.html'));
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db;

mongodb.MongoClient.connect('mongodb://indigo-brad:indigo_river@ds131890.mlab.com:31890/hungrymofos', (err, database) => {
  if (err) {
    console.log(err)
    process.exit(1);
  }
  db = database;
  console.log('Database connection is ready')
});
var server= app.listen(process.env.PORT || 8082, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

app.post('/api/submitProduct', function(req,res){
  const name = req.body.name
  const prices = req.body.prices
  console.log(prices,'this is the price through node')
  db.collection('products').insert({name:name, prices:prices},true, function(err,result){
    if(err){
      res.send('Error')

    }
    console.log(name,' has been sent')
    res.send( result )
      console.log(result)
  })

});

app.post('/api/retrieveProducts',function(req,res){
  db.collection('products').find().toArray((err,resultProducts) => {
    arrProducts = []
    //unique = [...new Set(resultProducts.map(i => i.name))]
    //res.send(unique)
    arrProducts.push(resultProducts)
    console.log(arrProducts)
    res.send(arrProducts)

    })

})
