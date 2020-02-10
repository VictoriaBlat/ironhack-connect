const express = require('express');

const router = express.Router();

//login
router.get('/login', (req, res, next) => {
	res.render('users/login');
});

router.post('/login', (req, res, next) => {
	// the user gets authenticated
	// a session is set and the user gets a req.user body

	const { username, password } = req.body;
	console.log(username, password);
	res.send('test');
	//
});

//createUser , just for admins
router.get('/createUser');
router.post('/createUser', (req, res, next) => {
	/* A new  */
});

//
module.exports = router;
