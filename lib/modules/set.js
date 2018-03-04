module.exports = function ({ action, message, state }) {
  const {
    key,
    value,
    map,
    random,
    notFoundText,
  } = action;

  if (value) {
    state.data[key] = value;
  } else if (map) {
    if (map[message]) {
      state.data[key] = map[message];
    } else {
      throw new Error(notFoundText);
    }
  } else if (random) {
    let length = random.length - 1;
    let index = Math.round(
      Math.random() * length
    );
    state.data[key] = random[index];
  } else {
    state.data[key] = message;
  }

  return state;
};
