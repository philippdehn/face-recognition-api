const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1', //localhost
		user: 'Phil47',
		password: '',
		database: 'smart-brain'
	}
});

db.select('*').from('users');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.json('Server is running.') })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.listen(80, () => { console.log('App is running on port 80.') })



