
const promisify = require('util');
const fs = require('fs');
const readFileAsync = promisify.promisify(fs.readFile); // (A)

function handleError(err) {
    console.log(err)
}

async function read(path) {
    try {
        const filename = await readFileAsync(path, {encoding: 'utf8'})
        const data = await readFileAsync(filename, {encoding: 'utf8'})
        console.log(data)
    } catch (error) {
        handleError(error)
    }

}

read('text.txt')

