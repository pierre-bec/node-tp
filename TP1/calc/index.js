// index.js


const calc = require('./calc.js')

const express = require('express')
const app = express()

app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.get('/sum/:a/:b', function (req, res) {
    let a = req.params.a
    let b = req.params.b
    res.send(a+" + "+b+" = "+(calc.sum(parseInt(a),parseInt(b))) )
})

app.get('/soustraction/:a/:b', function (req, res) {
    let a = req.params.a
    let b = req.params.b
    res.send(a+" - "+b+" = "+(calc.soustraction(a,b)) )
})

app.get('/multiplication/:a/:b', function (req, res) {
    let a = req.params.a
    let b = req.params.b
    res.send(a+" * "+b+" = "+(calc.multiplication(a,b)) )
})

app.get('/division/:a/:b', function (req, res) {
    let a = req.params.a
    let b = req.params.b
    res.send(a+" / "+b+" = "+(calc.division(a,b)) )
})



app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})