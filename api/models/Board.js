'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var constants = require('../constants');
var Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  user: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  content: {
    type: String,
    unique: false,
    required: true
  },
  cellSize: {
    type: String,
    trim: true,
    default: constants.DEFAULT_CELL_SIZE
  },
  locale: {
    type: String,
    default: constants.DEFAULT_LANG
  }
});

const validatePresenceOf = value => value && value.length;

/**
 * Validations
 */

// the below validations only apply if you are signing up traditionally

boardSchema.path('name').validate(function(name) {
  if (this.skipValidation()) return true;
  return name.length;
}, 'Name cannot be blank');

boardSchema.path('user').validate(function(user) {
  if (this.skipValidation()) return true;
  return user.length;
}, 'User cannot be blank');

boardSchema.path('content').validate(function(content) {
  if (this.skipValidation()) return true;
  return content.length;
}, 'Content cannot be blank');

boardSchema.path('name').validate(function(name, fn) {
  const Board = mongoose.model('Board');
  if (this.skipValidation()) fn(true);
  // Check only when it is a new board or when name field is modified
  if (this.isNew || this.isModified('name')) {
    Board.find({ name: name }).exec(function(err, boards) {
      fn(!err && boards.length === 0);
    });
  } else fn(true);
}, 'Board name already exists');

/**
 * Pre-save hook
 */

boardSchema.pre('save', function(next) {
  if (!this.isNew) return next();
  next();
});

/**
 * Methods
 */

boardSchema.methods = {
  /**
   * Validation is not required if using OAuth
   */

  skipValidation: function() {
    return null;
  }
};

/**
 * Statics
 */

boardSchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function(options, cb) {
    options.select = options.select || 'name user';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
};

var Board = mongoose.model('Board', boardSchema);

module.exports = Board;
