const { Router } = require('express');

const { search } = require('../controllers/search');

const router = Router();

router.get('/:collection/:term', search);

// For error handling.
router.get('/:collection', (req, res) => {
  res.status(404).json({
    error: 'Term is required',
  });
});
router.get('/', (req, res) => {
  res.status(404).json({
    error: 'Collection and Term are required',
  });
});

module.exports = router;