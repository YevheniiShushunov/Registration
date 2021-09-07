const Router = require('express');
const router = new Router();
const UserController = require('../controller/user.controller');
const pasport = require('passport');


router.post('/register', UserController.signUp);
router.get('/auth',pasport.authenticate('jwt', {session: false}), UserController.auth);
router.post('/login', UserController.signIn);
router.get('/countries', UserController.getCountries);


module.exports = router;
