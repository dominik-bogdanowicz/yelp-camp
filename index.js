const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('its yelp camp');
})

app.listen(3000, () => {
    console.log('On port 3000');
})
