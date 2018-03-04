module.exports = function ({ action, message, state }) {
  const {
    map,
    random,
    position,
    notFoundText,
  } = action;

  if (position) {
    state.position = position;
  } else if (map) {
    if (map[message]) {
      state.position = map[message];
    } else {
      throw new Error(notFoundText);
    }
  } else if (random) {
    let length = random.length - 1;
    let index = Math.round(
      Math.random() * length
    );
    state.position = random[index];
  } else {
    throw new Error(notFoundText);
  }

  return state;
};
