const fetchPokemon = async (index) => {
    const response = await fetch(`http://localhost:3000/pokemon/${index}/`)
    const pokemonData = await response.json();
    const title = document.getElementById('pokemonName');
    title.textContent = pokemonData.name;
}

fetchPokemon(1).catch(err => console.log(err))

let index = 1;
const button = document.getElementById('nextPokemon');
button.addEventListener('click', () => {
    index ++;
    fetchPokemon(index).catch(err => {
        console.log("error", err)
        index = 0;
    })
})

// create
const submitPokemon = async (e) => {
    e.preventDefault();

    const pokeData = {
        name: e.target.name.value,
        type: e.target.type.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(pokeData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch('http://localhost:3000/pokemon', options)
        .then(r => r.json())
        .then(appendSuccess)
        .catch(console.warn)
};

// delete
const deletePokemon = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const id = e.target.pokemonId.value
    const pokeData = {
        name: id
    };

    const options = { 
        method: 'DELETE',
        body: JSON.stringify(pokeData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch(`http://localhost:3000/pokemon/${id}`, options)
        .then(r => r.json())
        .then(appendDelete)
        .catch(console.warn)
};

function appendSuccess(pokeData){
    const newH3 = document.createElement('h3');
    newH3.textContent = `Name: ${pokeData.name} || Type: ${pokeData.type}`
    const body = document.querySelector('body');
    body.append(newH3);
};

function appendDelete(){
    const newH3 = document.createElement('h3');
    newH3.textContent = `Pokemon Deleted`
    const body = document.querySelector('body');
    body.append(newH3);
};

const form = document.querySelector('#new-poke-form');
form.addEventListener('submit', submitPokemon);

const formDelete = document.querySelector('#delete-poke-form');
formDelete.addEventListener('submit', deletePokemon);