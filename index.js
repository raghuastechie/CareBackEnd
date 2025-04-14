const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const login = require('./routes/login');
const signUp = require('./routes/signUp');
const usersList = require('./routes/usersList');
const forget = require('./routes/forget');
app.use(express.json());
app.use('/login', login);
app.use('/signup', signUp);
app.use('/users', usersList);
app.use('/forget', forget)

app.get('/', (req, res) => {
    res.send('site is up..');
});

app.listen(port, () => console.log(`listening on port : ${port}`))