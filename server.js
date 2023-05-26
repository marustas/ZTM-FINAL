const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

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
    ],
    login: [{
        id: '678',
        hash: '',
        email: 'stas@udemy.com'
    }]
}
app.get('/', (req, res) => {
    res.json(database.users);
})

app.post('/signin', (req, res) => {

    // Load hash from your password DB.
    //first parameter is password, second is hashed password
    bcrypt.compare("rightpass", '$2a$10$5bI06GeN96leJ18P1iT0sOGNFHPn0wEDwtt5JCqZiuRch7Rc7LRGq', function(err, res) {
        console.log('first guess', res);
    });
    bcrypt.compare("veggies", '$2a$10$5bI06GeN96leJ18P1iT0sOGNFHPn0wEDwtt5JCqZiuRch7Rc7LRGq', function(err, res) {
        console.log('second guess', res);
    });
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length - 1]);
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
        res.status(400).json('user not found');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('user not found');
    }
})

app.listen(3000, () => {
    console.log('all good');
})

/*
/ --> res = this is not working --done
/signin --> POST = successful --done
/register --> POST = user --done
/profile/:userId --> GET = user --done
/image --> POST --> user --done
*/