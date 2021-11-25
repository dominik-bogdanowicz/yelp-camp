const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, ("connection error:")));
db.once("open", () => {
    console.log('Database connected');
});

//Selects random element from array
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti possimus excepturi architecto mollitia maxime eveniet doloremque unde odio, expedita asperiores, recusandae consequatur iusto minima fugit, et eos laudantium. Veritatis, aut!',
            price: randomPrice
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
});