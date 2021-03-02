const express = require('express');
const router = express.Router();

import commonRoutes from './common';

router.use('/common', commonRoutes)

module.exports = router;