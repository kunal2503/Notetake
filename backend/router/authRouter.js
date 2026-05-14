const express =  require('express');
const {signin,signup, signout} = require('../controllers/authControllers');

const router = express.Router();

router.post("/auth/signin",signin);
router.post("/auth/signup",signup);
router.get("/auth/signout",signout);


module.exports = router;