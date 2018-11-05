const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const operatingSystemSchema = new Schema({
  name: {
    type: {},
    required: true,
    minlength: 1,
    trim: true
  },
  vendor: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  state: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  version: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  location: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  osHost: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'VirtualServer',
    required: false
  }]
});

const OS = mongoose.model('OS', operatingSystemSchema)

module.exports = { OS };
