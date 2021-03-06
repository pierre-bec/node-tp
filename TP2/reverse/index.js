const promisify = require('util')

const fs = require('fs');
const readFileAsync = promisify.promisify(fs.readFile);
const writeFileAsync = promisify.promisify(fs.writeFile);
// write is a promise that represent the file writing processing state

// we can use this promise with the then and catch functions
const call1 = readFileAsync('text.txt', {encoding: 'utf8'})
    .then((data) => {
        writeFileAsync('reverse.txt', data.split("").reverse().join(""))
        return data.split("").reverse().join("")
    })
    .catch((error) => {
        console.log('something went wrong')
    })

const call2 = readFileAsync('text2.txt', {encoding: 'utf8'})
    .then((data) => {
       writeFileAsync('reverse2.txt', data.split("").reverse().join(""))
        return data.split("").reverse().join("")
    })
    .catch((error) => {
        console.log('something went wrong')
    })

Promise.all([call1, call2])
    .then(values => {
    writeFileAsync('reverseFinal.txt', values.join(" "))
})
    .catch(error=> {
        console.log(error)
    })







