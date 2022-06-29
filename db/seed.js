db = connect("mongodb://localhost:27017/doggos")

db.pokemon.drop()

db.pokemon.insertMany([
    { pokeid: 1, name: 'bulba', type: 'grass/poison' },
    { pokeid: 2, name: 'ivy', type: 'grass/poison' },
    { pokeid: 3, name: 'vena', type: 'grass/poison' },
    { pokeid: 4, name: 'squi', type: 'water' },
    { pokeid: 5, name: 'warto', type: 'water' },
    { pokeid: 6, name: 'blast', type: 'water' },
    { pokeid: 7, name: 'char', type: 'water' },
    { pokeid: 8, name: 'charm', type: 'water' },
    { pokeid: 9, name: 'chari', type: 'water' },
])