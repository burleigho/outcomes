require('../config/config');

const _ = require('lodash');
const express = require('express');
const { ObjectID } = require('mongodb');
const { mongoose } = require('../db/mongoose');
const { Todo } = require('../playground/todo');
const { User } = require('../models/user');
const { authenticate } = require('../middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/', express.static('public'));
app.use(require('../routes/cmdb'));
app.use(require('../routes/users'));

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
