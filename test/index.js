'use strict';

require('chai').should();
const botScript = require('./test');
const StoryBot = require('../lib');
const Store = require('starbot-store-object');

const storeInstance = new Store();
const st = storeInstance.run('textBotName');

const bot = StoryBot(botScript, st);

describe('story-bot', () => {
  it('greeting', async () => {
    let answer = await bot('userId', 'Привет, Бот');
    answer.text.should.equal('Привет дорогой читатель. Я бот. Как тебя зовут?');
  });
  it('myname', async () => {
    let answer = await bot('userId', '{{Максим}}');
    answer.text.should.equal('Приятно познакомиться, Максим. Выбери вариант: 1 или 2?');
  });
  it('choice', async () => {
    let answer = await bot('userId', '1');
    answer.text.should.equal('Ты выбрал первый вариант. Отлично. Теперь я телепортирую тебя в случайное место');
  });
});
