// index.js

const express = require('express')

const app = express()

const axios = require('axios');
const nunjucks = require('nunjucks');


app.get('/myspecialusers', async function (req, res) {
    const fetchUser1 = axios.get('https://jsonplaceholder.typicode.com/users/1')
    const fetchUser4 = axios.get('https://jsonplaceholder.typicode.com/users/4')
    const fetchUser6 = axios.get('https://jsonplaceholder.typicode.com/users/6')

    const [result1, result2, result3] = await Promise.all([fetchUser1, fetchUser4, fetchUser6]);
    const data = {
        user1: result1.data,
        user2: result2.data,
        user3: result3.data
    }
    const html = await nunjucks.render('template.html', data)

    res.send(html);

})
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})