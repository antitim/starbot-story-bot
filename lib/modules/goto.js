'use strict';

module.exports = function (state, value, action) {
  state.position = value;
  return state;
};
