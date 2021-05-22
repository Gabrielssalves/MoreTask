const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const userController = require('../controllers/userController')

router.post('/register', userController.createUser);

router.post('/login', userController.loginUser);

router.get('/spotify/login', login.optional, userController.loginSpotify);

router.get('/spotify/callback', userController.loginSpotifyCallback);

router.get('/spotify/refresh', login.mandatory, userController.loginSpotifyRefresh);



module.exports = router;