const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const CampgorundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});
// Mongoose middleware, runs when 'findOneAndDelete' is called on Campground model
CampgorundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {                        //if campground exists
        await Review.remove({         //remove review object
            _id: {                    //where id
                $in: doc.reviews      //is somewhere in reviews array
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgorundSchema);
