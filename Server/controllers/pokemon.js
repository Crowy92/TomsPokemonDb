//controller for sending pokemon data
const express = require('express');
const router = express.Router();

const Pokemon = require('../models/pokemon')

router.get('/', (req, res) => {
    const data = Pokemon.all;
    res.send(data)
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const selectedPokemon = Pokemon.findById(id)
    console.log(selectedPokemon)
    res.send(selectedPokemon)
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