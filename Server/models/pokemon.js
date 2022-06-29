// model for dealing with the data
const { init } = require("../initdb");
const pokemonData = require('../data/pokemondata')

class Pokemon {
    constructor (data) {
        this.id = data._id
        this.name = data.name;
        this.type = data.type;
        this.pokeid = data.pokeid;
    }

    // static get all() {
    //     const pokemon = pokemonData.map((poke) => new Pokemon(poke))
    //     return pokemon;
    // }
    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const dbData = await db.collection('pokemon').find({}).toArray()
                // const dbData = await db.collection('dogs').find()
                console.log(dbData, "dbData");
                const pokemon = dbData.map(p => new Pokemon(p))
                // if (!pokemon.length) { throw new Error('No pokemon here!')}
                resolve(pokemon);
            } catch (err) {
                reject(`Error retrieving pokemon: ${err.message}`)
            }
        })
    }

    static findById(id) {
        const PokeData = pokemonData.filter((poke) => poke.pokeid === id)[0];
        const pokemon = new Pokemon(PokeData)
        return pokemon;
    }

    static create (poke) {
        const newPokeId = pokemonData.length + 1;
        const newPoke = new Pokemon({pokeid : newPokeId, ...poke})
        pokemonData.push(newPoke);
        return newPoke;
    }

    destroy () {
        const poke = pokemonData.filter((poke) => poke.pokeid === this.id)[0];
        pokemonData.splice(pokemonData.indexOf(poke), 1)
    }
}

module.exports = Pokemon