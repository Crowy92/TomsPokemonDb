// model for dealing with the data
const pokemonData = require('../data/pokemondata')
const { init } = require("../initdb")

class Pokemon {
    constructor (data) {
        this.id = data._id
        this.name = data.name;
        this.type = data.type;
        this.pokeid = data.pokeid;
    }

    static get all() {
        // const pokemon = pokemonData.map((poke) => new Pokemon(poke))
        // return pokemon;
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const dbData = await db.collection('pokemon').find({}).toArray()
                // const dbData = await db.collection('dogs').find()
                const pokemon = dbData.map(p => new Pokemon(p))
                if (!pokemon.length) { throw new Error('No pokies here!')}
                resolve(pokemon);
            } catch (err) {
                reject(`Error retrieving pokemon: ${err.message}`)
            }
        })
    }
    

    static findById(id) {
        // const PokeData = pokemonData.filter((poke) => poke.pokeid === id)[0];
        // const pokemon = new Pokemon(PokeData)
        // return pokemon;
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const dbData = await db.collection('pokemon').find({pokeid: id}).toArray()
                // const dbData = await db.collection('dogs').find()
                const pokemon = dbData.map(p => new Pokemon(p))
                if (!pokemon.length) { throw new Error('No pokies here!')}
                resolve(pokemon[0]);
            } catch (err) {
                reject(`Error retrieving pokemon: ${err.message}`)
            }
        })
    }

    static create (poke) {
        // const newPokeId = pokemonData.length + 1;
        // const newPoke = new Pokemon({pokeid : newPokeId, ...poke})
        // pokemonData.push(newPoke);
        // return newPoke;
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const dbData = await db.collection('pokemon').find({}).toArray()
                const newPokeId = dbData.length + 1;
                const success = await db.collection('pokemon').insertOne({pokeid : newPokeId, ...poke})
                if (!success) { throw new Error('No pokies here!')}
                resolve(poke);
            } catch (err) {
                reject(`Error retrieving pokemon: ${err.message}`)
            }
        })
    }

    destroy () {
        // const poke = pokemonData.filter((poke) => poke.pokeid === this.id)[0];
        // pokemonData.splice(pokemonData.indexOf(poke), 1)
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const success = await db.collection('pokemon').deleteOne({name: this.name})
                if (!success) { throw new Error('No pokies to delete!')}
                resolve(success);
            } catch (err) {
                reject(`Error deleting pokemon: ${err.message}`)
            }
        })
    }
}

module.exports = Pokemon