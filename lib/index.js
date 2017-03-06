'use strict';
const path = require('path');
const mustache = require('mustache');

/**
 * Built-in modules for input processing
 */
let modules = {
  'goto': require('./modules/goto'),
  'set': require('./modules/set')
};

/**
 * Random choise from range
 * @param {Array} choice Range
 */
let randomChoice = function (choice) {
  let length = choice.length;
  let index = Math.round(Math.random() * (length - 1));
  return choice[index];
};

/**
 * Removes special characters
 * @param {String} text
 * @returns {String}
 */
let escapeText = function (text) {
  text = text.replace(/[{}]/g, '');
  return text;
};

module.exports = function (bot, store) {
  let story = bot.story;

  if (bot.modules) {
    for (let moduleName in bot.modules) {
      modules[moduleName] = require(path.resolve(process.cwd(), bot.modules[moduleName]));
    }
  }

  return async function (userId, message) {
    message = escapeText(message);

    /**
     * @type {Object} state User state
     */
    let state = await store.get(userId);

    if (!state) {
      // Set initial state
      state = {
        position: '0',
        data: {}
      };
    } else {
      // Input processing

      /**
       * @type {Object} scene Current scene
       */
      let scene = story[state.position];

      for (let action of scene.input) {
        let type = action.type;
        let value;

        if (action.value) {
          value = action.value;
        } else if (action.map && action.map[message]) {
          value = action.map[message];
        } else if (action.random) {
          value = randomChoice(action.random);
        }

        let answer = modules[type](state, value, message, action);

        if (answer) {
          state = answer;
        } else {
          return {
            userId,
            text: bot.unrecognized
          };
        }
      };
    }

    /**
     * Save user state
     */
    await store.set(userId, state);

    // Prepare message for user
    let step = story[state.position];
    let text = step.text;
    text = mustache.render(text, state.data);

    return {
      userId,
      text
    };
  };
};
