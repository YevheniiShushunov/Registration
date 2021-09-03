const Router = require('express');
const router = new Router();
const UserController = require('../controller/user.controller');
const pasport = require('passport');


router.post('/register', UserController.signUp);
router.post('/auth',pasport.authenticate('jwt', {session: false}), UserController.auth);
router.post('/login', UserController.signIn);
router.get('/countries',pasport.authenticate('jwt', {session: false}), UserController.getCountries);



module.exports = router;
