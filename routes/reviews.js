const express = require('express');
const router = express.Router({ mergeParams: true });

const Review = require('../models/review');
const Campground = require('../models/campground');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const reviewJoiSchema = require('../utils/reviewJoiSchema');



const validateReview = (req, res, next) => {
    const { error } = reviewJoiSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:idRev', catchAsync(async (req, res) => {
    const { idRev } = req.params;
    const campground = await Campground.findById(req.params.id);
    await Campground.findByIdAndUpdate(campground._id, { $pull: { reviews: idRev } })
    await Review.findByIdAndDelete(idRev);
    req.flash('success', 'Review deleted!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

module.exports = router;