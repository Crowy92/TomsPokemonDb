const express = require('express');
const app = express();
const pokemonRoutes = require('./controllers/pokemon')
//allow your local host to make requests to the db
const cors = require ('cors');
app.use(cors());
//this allows me to pass data to the server
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/pokemon', pokemonRoutes)

module.exports = app;