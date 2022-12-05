require('dotenv').config();
const express = require('express');
const users = require('./routes/users');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(cors());
const db = require('./config/DB');
app.use(express.json());
db.ConnectToDb();
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/user', users);


app.listen(3000 || process.env.port);