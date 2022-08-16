const express = require('express');
const router = express.Router({ mergeParams: true });
const adoptions = require('../controllers/adoptions');
const { isLoggedIn } = require('../middleware');
const multer = require('multer');
const { storage, tempImageStorage } = require('../cloudinary');
const upload = multer({ storage:storage });
const uploadToTemp  = multer({ storage:tempImageStorage });



router
	.route('/')
	.get(adoptions.loadAnimals)
	.post(adoptions.uploadAnimal)
	.put(adoptions.updateAnimal)
	// .delete(adoptions.deleteAdoption)

router.route('/new').get(isLoggedIn, adoptions.renderCreateForm);
router.route('/success').put(adoptions.updateAdoptionSuccess);
router.route('/updateAvail').put(adoptions.updateAvailability2);


router.route('/process')
	.post(uploadToTemp.single('image'), adoptions.uploadToTemp)

router.route('/revert')
	.delete(adoptions.testingRevert)

router.route('/:id').delete(isLoggedIn, adoptions.deleteAdoption);



module.exports = router;
