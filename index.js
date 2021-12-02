const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Review = require('./models/review');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const campgroundJoiSchema = require('./utils/campgroundJoiSchema');
const reviewJoiSchema = require('./utils/reviewJoiSchema');

const campgrounds = require('./routes/campground');
const reviews = require('./routes/reviews')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, ("connection error:")));
db.once("open", () => {
    console.log('Database connected');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);
app.use(express.static('public'));

//Generic 404 for every not specified url
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
})
//Error handling
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err; //destucturing status code from error 
    if (!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error', { err })
});

app.listen(3000, () => {
    console.log('On port 3000');
});
