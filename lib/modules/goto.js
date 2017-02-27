'use strict';

module.exports = function (state, value, message, action) {
  if (value) {
    state.position = value;
    return state;
  } else {
    return false;
  }
};
