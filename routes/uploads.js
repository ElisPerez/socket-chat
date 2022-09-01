const { Router } = require('express');

const { uploadFile, updatePictureCloudinary, getPicture, getPictureCloudinary } = require('../controllers/uploads');
const { validateUpdatePicture, validateGetPicture, validateUploadFile } = require('../validators');

const router = Router();

/**
 ** Route 1: Upload a file
 */
router.post('/', validateUploadFile, uploadFile);

/**
 ** Route 2: Update a picture of a user or product (cloudinary)
 */
router.put('/:collection/:id', validateUpdatePicture, updatePictureCloudinary);
// , updatePicture);

/**
 ** Route 3: Get a picture of a user or product (cloudinary)
*/
router.get('/:collection/:id', validateGetPicture, getPictureCloudinary);

module.exports = router;
