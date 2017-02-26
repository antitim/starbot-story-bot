'use strict';

module.exports = function (state, value, action) {
  state.data[action.key] = value;
  return state;
};
