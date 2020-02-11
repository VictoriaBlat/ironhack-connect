const router = require('express').Router();

const checkForLogin = (req, res, next) => {
	if (!req.user) {
		res.redirect('/');
		return;
	}
	next();
};

router.use(checkForLogin);

// user is logged in

router.get('/', (req, res, next) => {
	console.log(req.user.role);
	res.render('feed', { admin: true });
});

module.exports = router;
