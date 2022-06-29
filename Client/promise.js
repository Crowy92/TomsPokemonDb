//Promises
const myPromise = new Promise((resolve, reject) => {
    const rand = Math.floor(Math.random() * 2)
    console.log(rand)
    if ( rand == 0 ) {
        resolve()
    } else {
        reject()
    }
})

myPromise
    .then(() => console.log('Success!'))
    .catch(() => console.log('Something went wrong :('))