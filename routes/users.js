const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

router.get('/register', (req, res) => {
    res.render('users/register');
})
router.post('/register', catchAsync(async (req, res) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password); //hidden middleware of mongoose passport implementation
    console.log(registeredUser);
    req.flash('success', 'Welcome to Yelp Camp!');
    res.redirect('/campgrounds');
}));
module.exports = router;
