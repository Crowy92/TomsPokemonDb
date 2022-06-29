// model for dealing with the data

const pokemonData = require('../data/pokemondata')

class Pokemon {
    constructor (data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
    }

    static get all() {
        const pokemon = pokemonData.map((poke) => new Pokemon(poke))
        return pokemon;
    }

    static findById(id) {
        const PokeData = pokemonData.filter((poke) => poke.id === id)[0];
        const pokemon = new Pokemon(PokeData)
        return pokemon;
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