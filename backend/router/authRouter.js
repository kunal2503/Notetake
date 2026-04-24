const express =  require('express');
const {signin,signup} = require('../controllers/authControllers');

const router = express.Router();

router.post("/auth/signin",signin);
router.post("/auth/signup",signup);


module.exports = router;