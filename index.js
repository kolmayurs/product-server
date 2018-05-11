const express = require('express');
const cors = require('cors');

const app = express();
var MongoClient = require('mongodb').MongoClient;


const url  ='mongodb+srv://kolimayurs:29031991@cluster0-onizc.mongodb.net';



app.use(cors());

app.get('/', (req,res) =>{
	res.send('go to /products to see products');
});

app.get('/products', (req,res) =>{
	MongoClient.connect(url, function(err, db) {
  if(err){
			return res.send(err);
		}
  var dbo = db.db("myDB");
  dbo.collection("Products").find({}).toArray(function(err, result)  {
    if(err){
			return res.send(err);
		}
		else{
			return res.json({
				data: result
			})
		}
    db.close();
  });
}); 
});

app.get('/products/add', (req,res) =>{
	MongoClient.connect(url, function(err, db) {
  if(err){
			return res.send(err);
		}
  var dbo = db.db("myDB");
  var myobj = { name: req.query.name, price: Number(req.query.price) };
  dbo.collection("Products").insertOne(myobj, function(err, result) {
    if(err){
			return res.send(err);
		}
    console.log("1 document inserted");
    res.send('1 document inserted');
    db.close();
  });
});
});

app.get('/products/delete', (req,res) =>{
	MongoClient.connect(url, function(err, db) {
  if(err){
			return res.send(err);
		}
  var dbo = db.db("myDB");
  var myobj = { name: req.query.name};
  dbo.collection("Products").deleteOne(myobj, function(err, result) {
    if(err){
			return res.send(err);
		}
    console.log("1 document deleted");
    res.send('1 document deleted');
    db.close();
  });
});
});

app.get('/products/update', (req,res) =>{
  MongoClient.connect(url, function(err, db) {
  if(err){
      return res.send(err);
    }
  var dbo = db.db("myDB");
   var myquery = { name: req.query.oldname};
  var newvalues = { $set: {name: req.query.name, price: Number(req.query.price) } };
  dbo.collection("Products").updateOne(myquery, newvalues, function(err, result) {
    if(err){
      return res.send(err);
    }
    console.log("1 document update");
    res.send('1 document update');
    db.close();
  });
});
});

var port=Number(process.env.PORT || 4000);
app.listen(port, () => {
	console.log('Product server listing from port ' + port);
})