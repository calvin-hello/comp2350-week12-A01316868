const database = include('databaseConnection');
const User = include('models/user');
const Pet = include('models/pet');
const Joi = require("joi");
const crypto = require('crypto');
const { v4: uuid } = require('uuid');
const passwordPepper = "mySuperSecretPepper123";

const router = require('express').Router();



router.get('/', async (req, res) => {
	console.log("page hit");
	try {
		const result = await User.find({})
		.select('first_name last_name email id').exec();
		console.log(result);
		res.render('index', {allUsers: result});
	}
	catch(ex) {
		res.render('error', {message: 'Error'});
		console.log("Error");
		console.log(ex);
	}
});

//route to populate the database
router.get("/populateData", async (req, res) => {
	console.log("populate Data");
	try {
		let pet1 = new Pet({
			name: "Fido"
		});
		let pet2 = new Pet({
		name: "Rex"
		});
		await pet1.save();
		//pet1.id contains the newly created pet's id
		console.log(pet1.id);
		await pet2.save();
		//pet2.id contains the newly created pet's id
		console.log(pet2.id);
		let user = new User({
			first_name: "Me",
			last_name: "Awesome",
			email: "a@b.ca",
			password_hash: "thisisnotreallyahash",
			password_salt: "notagreatsalt",
			pets: [pet1.id, pet2.id]
		}
		);
		await user.save();
		//user.id contains the newly created user's id
		console.log(user.id);
		res.redirect("/");
	}
	catch(ex) {
		res.render('error', {message: 'Error'});
		console.log("Error");
		console.log(ex);
	}
});

router.get("/showPets", async (req, res) => {
	console.log("page hit");
	try {
		const schema = Joi.string().max(25).required();
		const validationResult = schema.validate(req.query.id);
		if (validationResult.error != null) {
			console.log(validationResult.error);
			throw validationResult.error;
		}
		const userResult = await User.findOne({_id: req.query.id})
		.select('first_name id name ')
		.populate('pets').exec();
		console.log(userResult);
		res.render('pet', {userAndPets: userResult});
	}
	catch(ex) {
		res.render('error', {message: 'Error'});
		console.log("Error");
		console.log(ex);
	}
});



//add user - not part of this lab instructions
router.post('/addUser', async (req, res) => {
	try {
		console.log("form submit");

		const schema = Joi.object({
			first_name: Joi.string().alphanum().min(2).max(50).required(),
			last_name: Joi.string().alphanum().min(2).max(50).required(),
			email: Joi.string().email().max(150).required(),
			password: Joi.string().min(8).max(30).required()
		});

		const { error } = schema.validate(req.body);

		if (error) {
			console.log(error.details[0].message);
			return res.render('error', { message: 'Invalid user input' });
		}

		const existingUser = await User.findOne({ email: req.body.email });
		if (existingUser) {
			return res.render('error', { message: 'Email already exists' });
		}

		const saltHex = crypto
			.createHash('sha512')
			.update(uuid())
			.digest('hex');

		const hashHex = crypto
			.createHash('sha512')
			.update(req.body.password + passwordPepper + saltHex)
			.digest('hex');

		const user = new User({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password_salt: saltHex,
			password_hash: hashHex
		});

		await user.save();

		res.redirect('/');
	} catch (ex) {
		console.log("Error adding user");
		console.log(ex);
		res.render('error', { message: 'Error adding user' });
	}
});
module.exports = router;
