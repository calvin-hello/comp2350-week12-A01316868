const MongoClient = require("mongodb").MongoClient;

const is_hosted = process.env.IS_HOSTED || false;


const hostedURI = "mongodb://localhost/?authSource=admin&retryWrites=true&w=majority;"

const localURI = "mongodb://localhost/?authSource=admin&retryWrites=true&w=majority;"

if (is_hosted) {
	var database = new MongoClient(hostedURI, {useNewUrlParser: true, useUnifiedTopology: true});
}
else {
	var database = new MongoClient(localURI, {useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports = database;
		