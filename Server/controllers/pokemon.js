//controller for sending pokemon data
const express = require('express');
const router = express.Router();

const Pokemon = require('../models/pokemon')

router.get('/', async (req, res) => {
    try {
        const pokemon = await Pokemon.all;
        res.status(200).json({data: pokemon})
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const selectedPokemon = await Pokemon.findById(id)
        // res.status(200).json({data: selectedPokemon})
        res.send(selectedPokemon)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})

router.post('/', async (req, res) => {
    try {
    const data = req.body;
    const newPokemon = Pokemon.create(data);
    res.status(201).send(newPokemon);
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const pokeId = parseInt(req.params.id);
        const pokeToDestroy = await Pokemon.findById(pokeId);
        pokeToDestroy.destroy();
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
});

module.exports = router