const Hamster = require('../models/hamster');
const Animal = require('../models/animal');
const Users = require('../models/users');
const SuccessCase = require('../models/successCase');
const { v4: uuidv4 } = require('uuid');
const { default: axios } = require('axios');
const { cloudinary } = require('../cloudinary/index')






module.exports.index = async (req, res) => {
	const hamsters = await Hamster.find({}).populate({ path: 'author' });
	res.render('adoption/index.ejs', { hamsters });
};

module.exports.loadAnimals = async (req, res) => {
	const animals = await Animal.find().populate('creator');
	await res.json(animals);
};


module.exports.updateAnimal = async (req, res) => {
	console.log("req.body", req.body);
	try {
		if (!req.user.id) {
			console.log('user not logged in');
			res.send('user not logged in');
		}
		const user = await Users.findOne({ userId: req.user.id })
		switch (req.body.option) {
			case 'updateAvail':
				if (user.openAdoptions.includes(req.body.animalId)) {
					await Animal.findByIdAndUpdate(req.body.animalId, req.body.updateContent)
						.then(console.log('updateAvail success!!'))
					res.send('FROM SERVER: update availability successful');
				}
				break
			case 'updateSuccess':
				const animal = await Animal.findByIdAndUpdate(req.body.animalId, req.body.updateContent);
				await SuccessCase.create({ animal: animal })
					.then(console.log('adoptSuccess success!!'))
				res.send('FROM SERVER: update success successful');
				break
			case 'updateAnimalInfo':
				console.log('updatingInfo...')
				await Animal.findByIdAndUpdate(req.body.animalId, req.body.updateContent)
					.then(console.log('updateAnimalInfo success!!'))
				res.send('FROM SERVER: updateAnimalInfo successful');
				break

			default:
				break
		}
	} catch (error) {
		console.log('ERROR!!',error);
		res.send(error);
	}

}

module.exports.updateAvailability2 = async (req, res) => {
	console.log("req.body", req.body);
	// const boolean = req.body.availableForAdoption
	// console.log("boolean intend to update", !req.body.availableForAdoption);
	const user = await Users.findOne({ userId: req.user.id })
	if (user.openAdoptions.includes(req.body.animalId)) {
		await Animal.findByIdAndUpdate(req.body.animalId, { availableForAdoption: req.body.availableForAdoption })
			.then(console.log('updateAvail success!!'))
		res.send('update successfull');
	}
}

module.exports.updateAdoptionSuccess = async (req, res) => {
	console.log("req.body", req.body); //{ adoptionSuccessful: true }
	try {
		const animal = await Animal.findByIdAndUpdate(req.body.animalId, {adoptionSuccessful: true, availableForAdoption:false});
		await SuccessCase.create({ animal: animal });
		console.log('done!');
		res.send('success');
	} catch (error) {
		console.log(error);
	}
}

module.exports.uploadToTemp = async (req, res) => { //*working on this
	console.log('hello file!!!');
	console.log('req.body:', req.body);
	console.log(req.file);
	console.log(`req: ${JSON.stringify(req.body)}`);
	res.send({ msg: 'ok', fileId: req.file.filename,  });
}

module.exports.testingRevert = async (req, res) => {
	console.log('trying to delete')
cloudinary.v2.uploader.destroy(req.body, {resource_type:'image'}, function(error,result) {
  console.log(result, error) });

}

module.exports.uploadAnimal = async (req, res) => {
	try {
				const animalData = req.body
		animalData.animalImages.map(file => { //In Cloudinary, move img from tempImage folder to adoptions folder
					cloudinary.v2.uploader.rename(file,
						file.replace('tempImage', 'adoptions')
						,
						(res)=>{console.log(res)});
				})
		for (let i = 0; i < animalData.animalImages.length; i++) {
			animalData.animalImages[i] = animalData.animalImages[i].replace('tempImage',
				'https://res.cloudinary.com/dr1uoiu01/image/upload/adoptions');
			// console.log('HEY!!',animalData.animalImages[i])
		}
			const animal = await new Animal(animalData);
			const user = await Users.findOne({ userId: req.user.id });
			await user.openAdoptions.push(animal);
			console.log('ANIMAL:', animal);
			animal.creator = user;
			await animal.save();
			await user.save();
		console.log('database did not scold us, nice!');
		res.send('upload animal successful')
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	};

	module.exports.deleteAdoption = async (req, res) => {
		// console.log('deleteAdoption...activated');
		// console.log('REQ.PARAM', req.params);
		const user = await Users.findOne({ userId: req.user.id })
		// console.log("see if includes", user.openAdoptions.includes(req.params.id));
		console.log('USER', user);
		console.log('USER.OPENADOPT', user.openAdoptions);

		if (user.openAdoptions.includes(req.params.id)) {
			await Animal.deleteOne({ _id: req.params.id }).then(() => {
				console.log('deleteion succesfull');
			})
			await Users.findByIdAndUpdate("628aff4f2c4061eeb5a0d821", { $pullAll: { openAdoptions: [req.params.id] } }, { new: true }).then(() => {
				console.log('pulled from user');
			})
			res.send('deletion successful');
		}
	}


module.exports.renderCreateForm = async (req, res) => {
};

module.exports.createNewAdoption = async (req, res) => {
};

module.exports.renderUpdateForm = async (req, res) => {
};

module.exports.updateAdoption = async (req, res) => {
};

module.exports.uploadAnimalFilePool = async (req, res) => {

}


