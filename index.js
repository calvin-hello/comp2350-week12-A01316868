//Define the include function for absolute file name
global.base_dir = __dirname;
global.abs_path = function(path) {
	return base_dir + path;
}
global.include = function(file) {
	return require(abs_path('/' + file));
}



const express = require('express');
const router = include('routes/router');
require('dotenv').config();

const port = process.env.PORT || 3080;


const app = express();
app.set('view engine', 'ejs');
const { MongoClient } = require('mongodb');

const databaseName = "lab_example"
const uri = `mongodb+srv://${process.env.REMOTE_MONGODB_USER}:${process.env.REMOTE_MONGODB_PASSWORD}@${process.env.REMOTE_MONGODB_HOST}/${databaseName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));
app.use('/',router);


async function startServer() {
	try {
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db(databaseName);
		app.locals.db = db;

		app.listen(port, () => {
			console.log(`Node application listening on port http://localhost:${port}`);
		}); 
	} catch (err) {
		console.error("Failed to connect to MongoDB:", err);
	}
}

startServer();

// app.listen(port, () => {
// 	console.log(`Node application listening on port http://localhost:${port}`);
// }); 



