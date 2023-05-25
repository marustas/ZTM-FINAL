const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const database = {
    users: [{
            id: '123',
            gmail: 'ponus@gmail.com',
            password: 'wrongpassword',
            name: 'Asmanus',
            surname: 'Ramazanus',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            gmail: 'moschneishiy@gmail.com',
            password: 'rightpassword',
            name: 'Stasus',
            surname: 'Yussufus',
            entries: 0,
            joined: new Date()
        }
    ]
}
app.get('/', (req, res) => {
    res.send('working as expected');
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    res.json('sign in')
})

app.listen(3000, () => {
    console.log('all good');
})

/*
/ --> res = this is not working
/signin --> POST = successful --done
/register --> POST = user
/profile/:userId --> GET = user
/image --> POST --> user
*/