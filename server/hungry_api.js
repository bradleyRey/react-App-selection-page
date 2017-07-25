var express     = require('express');
var bodyParser  = require('body-parser');
var cors        = require('cors')
var app         = express();
var mongodb     = require('mongodb');
var path        = require('path');
var fsextra     = require('fs-extra');
var fs          = require('fs')
var util        = require('util')
var multer      = require('multer')
var upload      = multer( {dest:  __dirname + '/uploads'} )

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
      res.send({
        success:false,
        error: 'There has been an error...'
      })

    }
    console.log(name,' has been sent')
    res.send({
      success:true,
      message: result
    })
  })

});

app.post('/api/submitImage', upload.single('inputForm'), function(req,res){

    if (req.file == null) {
    // If Submit was accidentally clicked with no file selected...
      res.render('index', { title:'Please select a picture file to submit!'});

  }
  else{
    // read the img file from tmp in-memory location
   var newImg = fs.readFileSync(req.file.path);
   // encode the file as a base64 string.
   var encImg = newImg.toString('base64');
   // define your new document
   var newItem = {
      description: req.body.description,
      contentType: req.file.mimetype,
      size: req.file.size,
      img: Buffer(encImg, 'base64')
    };
    db.collection('products').insert(newItem, function(err, result){
      if(err) {
        console.log(err)
      }
      var newoid = new ObjectId(result.ops[0]._id);
      fs.remove(req.file.path, function(err) {
        if (err) { console.log(err) };
        res.render('index', {title:'Thanks for the Picture!'});
      });
    })
  }
})

app.post('/api/retrieveName',function(req,res){
  db.collection('products').find().toArray((err,resultProducts) => {
    arrProducts = []
    //unique = [...new Set(resultProducts.map(i => i.name))]
    //res.send(unique)
    for(i=0;i<resultProducts.length;i++){
      arrProducts.push(resultProducts[i].name)
    }
    console.log(arrProducts)
    res.send(arrProducts)
    })
})

app.post('/api/retrievePrice',function(req,res){
  db.collection('products').find().toArray((err,resultPrice) => {
    arrPrice = []
    //unique = [...new Set(resultProducts.map(i => i.name))]
    //res.send(unique)
    for(i=0;i<resultPrice.length;i++){
      arrPrice.push(resultPrice[i].prices)
    }

    console.log(arrPrice)
    res.send(arrPrice)

    })

})

app.post('/api/retrieveProducts',function(req,res){
  db.collection('products').find().toArray((err,results) => {
      res.send(results)
  })
})
