const database = require("mongoose");
const is_hosted = process.env.IS_HOSTED || false;
const databaseName = "lab_example"
const hostedURI = `mongodb+srv://${process.env.REMOTE_MONGODB_USER}:${process.env.REMOTE_MONGODB_PASSWORD}@cluster0.4ulcc.mongodb.net/${databaseName}?retryWrites=true&w=majority`
const localURI = `mongodb://localhost/${databaseName}?authSource=admin&retryWrites=true`
if (is_hosted) {
	database.connect(hostedURI, {useNewUrlParser: true, useUnifiedTopology: true});
}
else {
	database.connect(localURI, {useNewUrlParser: true, useUnifiedTopology: true});
}



// const MongoClient = require("mongodb").MongoClient;

// const is_hosted = process.env.IS_HOSTED || false;


// const hostedURI = "mongodb://localhost/?authSource=admin&retryWrites=true&w=majority;"

// const localURI = "mongodb://localhost/?authSource=admin&retryWrites=true&w=majority;"

// if (is_hosted) {
// 	var database = new MongoClient(hostedURI, {useNewUrlParser: true, useUnifiedTopology: true});
// }
// else {
// 	var database = new MongoClient(localURI, {useNewUrlParser: true, useUnifiedTopology: true});
// }

// module.exports = database;
		