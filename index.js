const axios = require('axios')
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({extended: true})
const jwt = require('jsonwebtoken')
const passport = require('passport')
const request = require("request");
const secret = 'thisisverysecret';
const cors = require('cors');



const JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}


const jwtStrategy = new JwtStrategy(jwtOptions, async function (payload, next) {
    // usually this would be a database call:
    const users = await getUsers()
    const user = users.data.find(user => user.email === payload.user)

    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

passport.use("jwt", jwtStrategy)

const app = express()
app.use(cors());

app.post('/login', urlEncodedParser, async function (req, res) {
    const email = req.body.email
    const password = req.body.password
    const users = await getUsers()
    console.log(req.body);

    if (!email || !password) {
        console.log("c'est ça");
        res.status(401).json({error: 'Email or password was not provided'})
        return
    }


    let user = users.data.find(
        (user) => user.email === email && user.password === password
    )


    if (!user) {
        res.status(401).json({error: 'Email and password do not match'})
        return
    }


    const userJwt = jwt.sign({user: user.email}, secret)

    res.json({jwt: userJwt})

})

app.post('/register', urlEncodedParser, async function (req, res) {
    axios({
        method: 'POST',
        url: 'https://projetnode-9cd4.restdb.io/rest/articleusers',
        data: {
            email: req.body.email,
            password: req.body.password
        },
        headers: {
            'cache-control': 'no-cache',
            'x-apikey': '7c31df49f81d1d3b5c60cb6b8a32badc6ee61',
            'content-type': 'application/json'
        }
    })
        .catch(function (error) {
            res.send(error)
        })
        .then(function (response) {
            // handle success
            res.send({
                code: 200,
                error: false,
                msg: "l'Utilisateur à bien été créé"
            });
        })
});

app.post('/article', urlEncodedParser, passport.authenticate('jwt', {session: false}), async function (req, res) {
    axios({
        method: 'POST',
        url: 'https://projetnode-9cd4.restdb.io/rest/article',
        headers:
            {
                'cache-control': 'no-cache',
                'x-apikey': '7c31df49f81d1d3b5c60cb6b8a32badc6ee61',
                'content-type': 'application/json'
            },
        data: {
            title: req.body.title,
            content: req.body.content
        }
    })
        .catch(function (error) {
            res.send(error)
        })
        .then(function (response) {
            // handle success
            res.send({
                code: 200,
                error: false,
                msg: "l'Article à bien été créé"
            });
        })
});

app.get('/articles', urlEncodedParser, passport.authenticate('jwt', {session: false}), async function (req, res) {
    axios({
        method: 'GET',
        url: 'https://projetnode-9cd4.restdb.io/rest/article',
        headers:
            { 'cache-control': 'no-cache',
                'x-apikey': '7c31df49f81d1d3b5c60cb6b8a32badc6ee61' }
    })
        .catch(function (error) {
            res.send(error)
        })
        .then(function (response) {
            // handle success
            res.send({
                code: 200,
                error: false,
                data: response.data
            });
        })
});

app.put('/article/:id', urlEncodedParser, passport.authenticate('jwt', {session: false}), async function (req, res) {
    axios({
        method: 'PUT',
        url: 'https://projetnode-9cd4.restdb.io/rest/article/'+req.params.id,
        headers:
            { 'cache-control': 'no-cache',
                'x-apikey': '7c31df49f81d1d3b5c60cb6b8a32badc6ee61',
                'content-type': 'application/json' },
        data: {
            title: req.body.title,
            content: req.body.content
        },
    })
        .catch(function (error) {
            res.send(error)
        })
        .then(function (response) {
            // handle success
            res.send({
                code: 200,
                error: false,
                msg: "l'Article à bien été modififé"
            });
        })
});

app.delete('/article/:id', urlEncodedParser, passport.authenticate('jwt', {session: false}), async function (req, res) {
    axios({
        method: 'DELETE',
        url: 'https://projetnode-9cd4.restdb.io/rest/article/'+req.params.id,
        headers:
            { 'cache-control': 'no-cache',
                'x-apikey': '7c31df49f81d1d3b5c60cb6b8a32badc6ee61',
                'content-type': 'application/json' }
    })
        .catch(function (error) {
            res.send(error)
        })
        .then(function (response) {
            // handle success
            res.send({
                code: 200,
                error: false,
                msg: "l'Article à bien été supprimé"
            });
        })
});

app.get('/article/:id', urlEncodedParser, passport.authenticate('jwt', {session: false}), async function (req, res) {
    axios({
        method: 'GET',
        url: 'https://projetnode-9cd4.restdb.io/rest/article/'+req.params.id,
        headers:
            { 'cache-control': 'no-cache',
                'x-apikey': '7c31df49f81d1d3b5c60cb6b8a32badc6ee61' }
    })
        .catch(function (error) {
            res.send(error)
        })
        .then(function (response) {
            // handle success
            res.send({
                code: 200,
                error: false,
                msg: response.data
            });
        })
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('running')
})


async function getUsers() {
    const url = 'https://projetnode-9cd4.restdb.io/rest/articleusers'
    const config = {
        headers: {
            'x-apikey': '7c31df49f81d1d3b5c60cb6b8a32badc6ee61'
        }
    }

    return axios.get(url, config)
}