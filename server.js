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
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            gmail: 'moschneishiy@gmail.com',
            password: 'rightpassword',
            name: 'Stasus',
            entries: 0,
            joined: new Date()
        }
    ]
}
app.get('/', (req, res) => {
    res.json(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('user not found');
    }
})

app.listen(3000, () => {
    console.log('all good');
})

/*
/ --> res = this is not working
/signin --> POST = successful --done
/register --> POST = user --done
/profile/:userId --> GET = user --done
/image --> POST --> user
*/