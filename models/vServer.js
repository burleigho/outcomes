const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vServerSchema = new Schema({
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
  model: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  location: {
    type: String,
    required: false,
    minlength: 1,
    trim: true
  },
  state: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  _creator: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

const VirtualServer = mongoose.model('VirtualServer', vServerSchema)

module.exports = { VirtualServer };
