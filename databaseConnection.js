const mongoose = require("mongoose");

const databaseName = "lab_example";
const is_hosted = process.env.IS_HOSTED === "true";

const hostedURI = `mongodb+srv://${process.env.REMOTE_MONGODB_USER}:${encodeURIComponent(process.env.REMOTE_MONGODB_PASSWORD)}@${process.env.REMOTE_MONGODB_HOST}/${process.env.REMOTE_MONGODB_DATABASE || databaseName}?retryWrites=true&w=majority`;

const localURI = `mongodb://127.0.0.1:27017/${databaseName}`;

const uri = is_hosted ? hostedURI : localURI;

console.log("IS_HOSTED:", process.env.IS_HOSTED);
console.log("Using database:", is_hosted ? "Atlas" : "Local MongoDB");

mongoose.connect(uri)
	.then(() => {
		console.log("MongoDB connected");
	})
	.catch((err) => {
		console.log("MongoDB connection error");
		console.log(err);
	});

module.exports = mongoose;

// const database = require("mongoose");
// const is_hosted = process.env.IS_HOSTED || false;
// const databaseName = "lab_example"
// const hostedURI = `mongodb+srv://theMongoAdmin:accidentalLoginSteps@cluster0.4ulcc.mongodb.net/${databaseName}?retryWrites=true&w=majority`
// const localURI = `mongodb://localhost/${databaseName}?authSource=admin&retryWrites=true`
// if (is_hosted) {
// 	database.connect(hostedURI, {useNewUrlParser: true, useUnifiedTopology: true});
// }
// else {
// 	database.connect(localURI, {useNewUrlParser: true, useUnifiedTopology: true});
// }



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
		