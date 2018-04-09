const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCT_QUERY = "SELECT * FROM  `products` LIMIT 0 , 30";

/*const connection = mysql.createConnection({
	host: 'mysql.hostinger.in',
	user: 'u353447878_pro',
	password: '29031991',
	database: 'u353447878_pro',
});*/
	var self = this;
    var pool = mysql.createPool({
        connectionLimit : 100,
        waitForConnections : true,
        queueLimit :0,
        /*host: 'localhost',
		user: 'root',
		password: '',
		database: 'test',*/
		host: 'mysql.hostinger.in',
	user: 'u353447878_pro',
	password: '29031991',
	database: 'u353447878_pro',
        debug    :  true,
        wait_timeout : 28800,
        connect_timeout :10
    });

/*  var self = this;
    var pool = mysql.createPool({
        connectionLimit : 100,
        waitForConnections : true,
        queueLimit :0,
        hostname: 'mysql.hostinger.in',
		user: 'u353447878_macwy',
		password: '29031991',
		database: 'u353447878_macwy',
        debug    :  true,
        wait_timeout : 28800,
        connect_timeout :10
    });*/

/*connection.connect(err => {
	if(err){
		return err;
		console.log(err);
	}
	console.log('connected');
});
*/
//console.log(connection);

app.use(cors());

app.get('/', (req,res) =>{
	res.send('go to /products to see products');
});

app.get('/products/add', (req,res) =>{
	const INSERT_INTO_PRODUCT = 'INSERT INTO products (name, price) VALUES ("'+req.query.name+'", '+req.query.price+')';
	pool.query(INSERT_INTO_PRODUCT, (err, results)=>{
		if(err){
		res.send(err);
	}
	else{
		res.send("Product Succesfully added");
	}
	});
	
});
app.get('/products/update', (req, res) =>{
	const UPDATE_PRODUCT_QUERY = 'UPDATE products SET price = '+req.query.price+' WHERE product_id = '+req.query.product_id+'';
	pool.query(UPDATE_PRODUCT_QUERY, (err, result) =>{
		if(err){
			res.send(err);
		}
		else{
			res.send('Product price updated');
		}
	});
});

app.get('/products/delete', (req, res) => {
	const DELETE_PRODUCT_QUERY = 'DELETE FROM products WHERE product_id = '+req.query.product_id+'';
	pool.query(DELETE_PRODUCT_QUERY, (err, results) =>{
		if(err){
			res.send(err);
		}
		else{
			res.send('Product deleted Succesfully');
		}
	});
});
app.get('/products', (req,res) =>{
	pool.query(SELECT_ALL_PRODUCT_QUERY, (err, results) =>{
		if(err){
			//console.log('Ye hai Error ');
			return res.send(err);
		}
		else{
			//console.log('Succesful');
			return res.json({
				data: results
			})
		}
	});
	//res.send('products');
});
var port=Number(process.env.PORT || 4000);
app.listen(port, () => {
	console.log('Product server listing from port ' + port);
})