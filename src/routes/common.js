const express = require('express');
const router = express.Router();

/** Controllers imports */
import * as  commonController from '../controllers/common.controller';

// /** auth routes */
router.post('/generatePdf', commonController.generatePdf);

module.exports = router;