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

    res.send(server[0].name);
  }
  catch (e) {
    res.status(400).send(e);
  }
});

router.get('/cmdb/parent/:name', authenticate, async (req, res) => {
  try {
    const id = req.params.name;
    await OS.findOne({
      name: id,
    }).populate('osHost').exec((err, os) => {
      res.send(os);
    })
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
      state: req.body.state,
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
      osHost: req.body.osHost,
      state: req.body.state
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

// DELETE

router.delete('/cmdb/os', authenticate, (req, res) => {
  const name = req.body.name;

  OS.findOneAndDelete({
    name
  }).then((os) => {
    if (!os) {
      return res.status(404).send();
    }

    res.send({ os });
  }).catch((e) => {
    res.status(400).send();
  });
});

//PATCH

router.patch('/cmdb/os', authenticate, async (req, res) => {
  try {
    const name = req.body.name;
    const state = req.body.state;
    await OS.findOneAndUpdate({name}, {state});
    const doc = await OS.find({name});
    res.send(doc);
  }
  catch(e) {
    res.status(400).send(e);
  }
});

module.exports = router;
