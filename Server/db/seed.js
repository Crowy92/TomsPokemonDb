db = connect("mongodb://localhost:27017/pokies")
console.log("in the seed.js");
db.pokemon.drop()

db.pokemon.insertMany([
    { name: 'rodney', type: 'grass/poison', pokeid: "1" },
    { name: 'ivy', type: 'grass/poison', pokeid: "2" },
    { name: 'vena', type: 'grass/poison', pokeid: "3" },
    { name: 'squi', type: 'water', pokeid: "4" },
    { name: 'warto', type: 'water', pokeid: "5" },
    { name: 'blast', type: 'water', pokeid: "6" },
    { name: 'char', type: 'water', pokeid: "7" },
    { name: 'charm', type: 'water', pokeid: "8" },
    { name: 'chari', type: 'water', pokeid: "9" },
])