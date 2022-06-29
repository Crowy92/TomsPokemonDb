// model for dealing with the data
const pool = require('../initdb');
// const pokemonData = require('../data/pokemondata')

class Pokemon {
    constructor (data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
    }

    static get all() {
        // const pokemon = pokemonData.map((poke) => new Pokemon(poke))
        // return pokemon;
        return new Promise (async (resolve, reject) => {
            try {
                const pokeData = await pool.query(`SELECT * FROM pokemon;`)
                console.log(pokeData, "pokedata");
                const poke = pokeData.rows.map(d => new Pokemon(d))
                if (!poke.length) { throw new Error('No pokeos here!')}
                resolve(poke);
            } catch (err) {
                reject(`Error retrieving poke: ${err.message}`)
            }
        })
    }

    static findById(id) {
        // const PokeData = pokemonData.filter((poke) => poke.id === id)[0];
        // const pokemon = new Pokemon(PokeData)
        // return pokemon;
        return new Promise (async (resolve, reject) => {
            try {
                const pokeData = await pool.query(`SELECT * FROM pokemon WHERE id = $1`, [ id ])
                // console.log(pokeData, "pokedata");
                const poke = pokeData.rows.map(d => new Pokemon(d))
                if (!poke.length) { throw new Error('No pokeos here!')}
                resolve(poke[0]);
            } catch (err) {
                reject(`Error retrieving poke: ${err.message}`)
            }
        })
    }

    static create (poke) {
        const newPokeId = pokemonData.length + 1;
        const newPoke = new Pokemon({id : newPokeId, ...poke})
        pokemonData.push(newPoke);
        return newPoke;
    }

    destroy () {
        const poke = pokemonData.filter((poke) => poke.id === this.id)[0];
        pokemonData.splice(pokemonData.indexOf(poke), 1)
    }
}

module.exports = Pokemon