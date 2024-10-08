const express = require('express');
const router = express.Router();
const fetchIUCNData = require('../middlewares/fetchIUCNData');

// Define routes
router.get('/species', fetchIUCNData);

module.exports = router;
