'use strict';

require('chai').should();
const story = require('./story');
const StoryBot = require('../lib');
const Store = require('starbot-store-object');

const st = new Store();

describe('story-bot', () => {
  it('greeting', async () => {
    const bot = new StoryBot({
      story,
      modules: {
        damage: ({ action, message, state }) => state
      },
      unrecognizedText: 'Не могу Вас понять'
    });

    bot.store = st;

    bot.on('message', (data) => {
      data.should.deep.equal({
        client: 'userId',
        text: 'Привет дорогой читатель. Я бот. Как тебя зовут?'
      });
    });

    await bot.message({
      client: 'userId',
      text: 'Привет, Бот'
    });
  });
  it('myname', async () => {
    const bot = new StoryBot({
      story,
      modules: {
        damage: ({ action, message, state }) => state
      },
      unrecognizedText: 'Не могу Вас понять'
    });

    bot.store = st;

    bot.on('message', (data) => {
      data.text.should.equal('Приятно познакомиться, Максим. Выбери вариант: 1 или 2?');
    });

    await bot.message({
      client: 'userId',
      text: '{{Максим}}'
    });
  });
  it('choice', async () => {
    const bot = new StoryBot({
      story,
      modules: {
        damage: ({ action, message, state }) => state
      },
      unrecognizedText: 'Не могу Вас понять'
    });

    bot.store = st;

    bot.on('message', (data) => {
      data.text.should.equal('Ты выбрал первый вариант. Отлично. Теперь я телепортирую тебя в случайное место');
    });

    await bot.message({
      client: 'userId',
      text: '1'
    });
  });
});
