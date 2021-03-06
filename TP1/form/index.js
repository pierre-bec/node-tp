// index.js

const express = require('express')
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

const app = express()

app.get('/', function(req, res) {
    res.send('Hello world !')
})

app.post('/form', urlEncodedParser, function(req, res) {
    console.log(req.body)
    res.send('form')
})

app.post('/concat', urlEncodedParser, function(req, res) {
    console.log(req.body.string1+req.body.string2)
    res.send('form')
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})