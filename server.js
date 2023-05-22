const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('working as expected');
})

app.listen(3000, () => {
    console.log('all good');
})

/*
/ --> res = this is not working
/signin --> POST = successful
/register --> POST = user
/profile/:userId --> GET = user
/image --> POST --> user
*/