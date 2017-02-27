'use strict';

const mustache = require('mustache');
/**
 * Загружаем модули для обработки ввода пользователя
 */
const modules = {
  'goto': require('./modules/goto'),
  'set': require('./modules/set')
};

/**
 * Возвращает случайный элемент из массива choice
 */
let randomChoice = function (choice) {
  let length = choice.length;
  let index = Math.round(Math.random() * (length - 1));
  return choice[index];
};

/**
 * Удаляет спец символы используемые в шаблонизаторе из строки text
 */
let escapeText = function (text) {
  text = text.replace(/[{}]/g, '');
  return text;
};

module.exports = function (bot, store) {
  /**
   * Управляющая история для бота
   */
  let story = bot.story;

  return async function (userId, message) {
    message = escapeText(message);

    /**
     * Запрашиваем текущее состояние пользователя
     */
    let state = await store.get(userId);

    if (!state) {
      /**
       * Если состояние отсутствует, то инициализируем его
       */
      state = {
        position: '0',
        data: {}
      };
    } else {
      let room = story[state.position];

      for (let action of room.input) {
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
     * Сохраняем обновлённое состояние
     */
    await store.set(userId, state);

    /**
     * Формируем сообщение
     */
    let step = story[state.position];
    let text = step.text;
    let attachment = step.attachment;
    text = mustache.render(text, state.data);

    return {
      userId,
      text,
      attachment
    };
  };
};
