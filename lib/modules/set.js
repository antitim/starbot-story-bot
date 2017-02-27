'use strict';

module.exports = function (state, value, message, action) {
  state.data[action.key] = value || message;
  return state;
};
