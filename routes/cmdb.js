const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { VirtualServer } = require('../models/vServer');
const { OS } = require('../models/os');
const { authenticate } = require('../middleware/authenticate');

router.use(express.json());

// GET

router.get('/cmdb/virtualserver/:name', authenticate, async (req, res) => {
  try {
    const id = req.params.name;
    const server = await VirtualServer.find({
      name: id,
    });

    if (!server) {
        return Promise.reject(res.status(403).send());
    }

    res.send(server[0].name);
  }
  catch (e) {
    res.status(400).send(e);
  }
});

// POST

router.post('/cmdb/virtualserver', authenticate, async (req, res) => {
  try {
    const vServer = new VirtualServer({
      name: req.body.name,
      vendor: req.body.vendor,
      model: req.body.model,
      location: req.body.location,
      _creator: req.user._id
    });

    const doc = await vServer.save();
    res.send(doc);
  }
  catch (e) {
    res.status(400).send(e);
  }
});

router.post('/cmdb/os', authenticate, async (req, res) => {
  try {
    const os = new OS({
      name: req.body.name,
      vendor: req.body.vendor,
      version: req.body.version,
      location: req.body.location,
      _creator: req.user._id,
      osHost: req.body.osHost
    });

    const doc = await os.save();
    res.send(doc);
  }
  catch (e) {
    res.status(400).send(e);
  }
});

router.post('/cmdb/pserver', authenticate, async (req, res) => {
  try {
  const pServer = new PServer({
    text: req.body.text,
    _creator: req.user._id
  });

  const doc = await pServer.save();
  res.send(doc);
  } 
  catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
