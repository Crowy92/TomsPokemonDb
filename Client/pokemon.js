const fetchPokemon = async (index) => {
    const response = await fetch(`http://localhost:3000/pokemon/${index}/`)
    const pokemonData = await response.json();
    // console.log(pokemonData);
    const title = document.getElementById('pokemonName');
    title.textContent = pokemonData.name;
}

fetchPokemon(1).catch(err => console.log(err))

let index = 1;
const button = document.getElementById('nextPokemon');
button.addEventListener('click', () => {
    index ++;
    fetchPokemon(index).catch(err => {
        console.log(err)
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

function appendSuccess(pokeData){
    const newH3 = document.createElement('h3');
    newH3.textContent = `Name: ${pokeData.name} || Type: ${pokeData.type}`
    const body = document.querySelector('body');
    body.append(newH3);
};


const form = document.querySelector('#new-poke-form');
form.addEventListener('submit', submitPokemon);