# starbot-story-bot [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
## About

Story bot for [StarBot](https://github.com/antitim/starbot)

## Installation

```sh
$ npm install --save starbot-story-bot
```

## Using

```js
const bot = Starbot({
  ...
  bot: './testBot'
  ...
});
```

testBot.js
```json
  "name": "testBot",
  "version": "1.0.0",
  "description": "",
  "author": "Maximilian Timofeev <antitim@yandex.ru>",

  "botControl": "starbot-story-bot",

  // Additional action modules
  "modules": {
    "damage": "./test/module"
  },

  // The story of the bot.
  "story": {
    "0": {
      "text": "Hello. What is your name?",
      "input": [
        {
          "type": "goto",
          "value": "1"
        },
        {
          "type": "set",
          "key": "name"
        }
      ]
    },
    "1": {
      "text": "Nice to meet you, {{name}}. Choose option 1 or 2?",
      "input": [
        {
          "type": "goto",
          "map": {
            "1": "2",
            "2": "3"
          }
        }
      ]
    },
    "2": {
      "text": "You chose the first option. Great. Now I'm going to bring you to a random location",
      "input": [
        {
          "type": "goto",
          "random": ["1", "4", "5"]
        }
      ]
    },
    "3": {
      "text": "You chose the second option. Well. Well",
      "input": [
        {
          "type": "goto",
          "value": "0"
        }
      ]
    },
    "4": {
      "text": "Congratulations, you're in 4th place",
      "input": [
        {
          "type": "goto",
          "value": "0"
        }
      ]
    },
    "5": {
      "text": "Congratulations, you're in 5th place",
      "input": [
        {
          "type": "goto",
          "value": "0"
        }
      ]
    }
  },

  // The message, if the bot does not understand the input 
  "unrecognized": "I don`t understand"
```

### Story

```json
{
  "id1Scene": {}, // 1th Scene
  "id2Scene": {} // 2nd Scene
  ...
}
```

### Scene

```json
{
  "text": "Message for user", // The message is processed by the mustache template engine in the context of the user state
  "input": [{}, {}] // Array of actions (instructions for processing input)
}
```

### Action

```json
{
  "type": "goto", // Type of the action. Built-in: 'goto' and 'set'
  "value": "1", // Value
  "map": { // Map user input to value
    "1": "2",
    "2": "3"
  },
  "random": ["1", "4", "5"] // Get random item for value
  ...
}
```

## Build-in action
### goto

Change user position to ```value```. The position of the user corresponds to the ID of the scene.

```json
{
  "type": "goto",
  "value": "room7"
}
```

### set

Sets the ```value``` field ```key``` user state

```json
{
  "type": "set",
  "value": "some value",
  "key": "someField"
}
```
## Custom action

Blank module:

```js
/**
 * @param {any} state Current state of the user
 * @param {Number|String} value Value from "value", "random" or "map" field of action
 * @param {String} message The message that the user entered 
 * @param {Object} action Action object
 *
 * @returns {any} New state of the user
 */
module.exports = function (state, value, message, action) {
  return state;
};
```


## License

MIT © [antitim](http://vk.com/antitim)


[npm-image]: https://badge.fury.io/js/starbot-story-bot.svg
[npm-url]: https://npmjs.org/package/starbot-story-bot
[travis-image]: https://travis-ci.org/antitim/starbot-story-bot.svg?branch=master
[travis-url]: https://travis-ci.org/antitim/starbot-story-bot
