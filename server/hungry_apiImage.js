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
var ejs         = require('ejs')
var formidable = require('formidable')

const MongoClient = require('mongodb').MongoClient;

app.use(express.static(path.resolve(__dirname, '../react', 'build')));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname, '../react', 'build', 'index.html'));
});
console.log(__dirname)
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
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
  var form = new formidable.IncomingForm();
  console.log(form)
  form.parse(req, (err, fields, files) => {
    console.log(err)
    console.log(fields)
    console.log(files)
      res.send('NOT IMPLEMENTED: pollsController createPost');
  })
/*
  var form = req.body
  console.log('this is file',form)

  const name = req.body.name
  const prices = req.body.prices
  console.log(prices,'this is the price through node')
  if(name == '' || prices == ''){
    res.send ({
      success:false,
      error: 'Fill in the whole form'
    })
    return;
  }

  db.collection('products').insert({form: form},true, function(err,result){
    if(err){
      res.send({
        success:false,
        error: 'There has been an error...'
      })
    }
    console.log(name,' has been sent to the Database!')
    res.send({
      success:true,
      message: result
    })
  })*/
});

app.post('/api/submitImage', upload.single('inputForm'), function(req,res){
  var file = req.body.file
  console.log('this is file',file)
    if (file == null) {
    // If Submit was accidentally clicked with no file selected...
      //res.render('admin', { title:'Please select a picture file to submit!'});
      res.send({success: false, message: "dsfdsg"})
      console.log('There is no file present')
      console.log(req.file,'file')
    }
  else{
    // read the img file from tmp in-memory location
   var newImg = fs.readFileSync(req.file.path);
   console.log(newImg,'details of the new image')
   // encode the file as a base64 string.
   var encImg = newImg.toString('base64');
   console.log(encImg,'kdfjndodj')
   // define your new document
   var newItem = {
      description: req.body.description,
      contentType: req.file.mimetype,
      size: req.files.size,
      img: Buffer(encImg, 'base64')
    };
    db.collection('products').insert(newItem, function(err, result){
      if(err) {
        console.log(err)
      }
      var newoid = new ObjectId(result.ops[0]._id);
      fs.remove(req.file.path, function(err) {
        if (err) { console.log(err) };
        res.render('./src/components/adminContainer.js', {title:'Thanks for the Picture!'});
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
