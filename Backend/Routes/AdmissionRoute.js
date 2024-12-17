// src/routes/admissionRoutes.js
const express = require('express');
const router = express.Router();
const { createAdmission } = require('../controllers/admissionController.js');

router.post('/post', createAdmission);

module.exports = router;
