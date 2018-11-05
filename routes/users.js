const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { authenticate } = require('../middleware/authenticate');

router.use(express.json());

//GET

router.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

//POST

router.post('/users/login', async (req, res) => {
  try {
  const body = _.pick(req.body, ['email', 'password']);
  const user = await User.findByCredentials(body.email, body.password);
  const token = await user.generateAuthToken();
  res.header('x-auth', token).send(user);
  }
catch(e) {
    res.status(400).send();
  }
});

router.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  }
  catch (e) {
    res.status(400).send(e);
  }
});

//DELETE

router.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

module.exports = router;