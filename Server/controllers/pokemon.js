//controller for sending pokemon data
const express = require('express');
const router = express.Router();

const Pokemon = require('../models/pokemon')

router.get('/', async (req, res) => {
    try {
        const data = await Pokemon.all;
        res.send(data)
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err })
    }
})

router.get('/:id', async (req, res) => {
    try {
    const id = parseInt(req.params.id);
    const selectedPokemon = await Pokemon.findById(id)
    console.log(selectedPokemon)
    res.send(selectedPokemon)
} catch(err) {
    console.error(err);
    res.status(500).json({ error: err })
}
})

router.post('/', (req, res) => {
    const data = req.body;
    const newPokemon = Pokemon.create(data);
    res.status(201).send(newPokemon);
});

router.delete('/:id', (req, res) => {
    const pokeId = parseInt(req.params.id);
    const pokeToDestroy = Pokemon.findById(pokeId);
    pokeToDestroy.destroy();
    res.status(204).send();
});

module.exports = router