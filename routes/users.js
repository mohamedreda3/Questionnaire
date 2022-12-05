const express = require('express');
const users = require('../controllers/userController');
const router = express.Router();
const userClass = new users('Mohammed');


router.post('/signup',(req, res) => userClass.signUp(req, res));
router.get('/login', (req, res) => userClass.logIn(req, res));
router.get('/sendMessage', (req, res) => userClass.sendMessage(req, res));
router.post('/updateStatus', (req, res) => userClass.updateAnswered(req, res));
router.get('/getData', (req, res) => userClass.getData(req, res));

router.post('/', (req, res) => {
    res.status(404).json({ message: 'Wrong Route' })
});


module.exports = router;