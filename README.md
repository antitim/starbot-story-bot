# starbot-story-bot [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
## About

Story bot for [StarBot](https://github.com/antitim/starbot)

## Installation

```sh
$ npm install --save starbot-story-bot
```

## Using

```js
const StoryBot = require('starbot-story-bot');
const story = require('./story');

const bot = StoryBot({
  story,
  modules: {
    damage: ({ action, message, state }) => state
  },
  unrecognizedText: 'I don`t understand',
});
```

story.json
```json
  {
    "0": {
      "text": "Hello. What is your name?",
      "actions": [
        {
          "name": "goto",
          "position": "1"
        },
        {
          "name": "set",
          "key": "name"
        }
      ]
    },
    "1": {
      "text": "Nice to meet you, {{name}}. Choose option 1 or 2?",
      "actions": [
        {
          "name": "goto",
          "map": {
            "1": "2",
            "2": "3"
          }
        }
      ]
    },
    "2": {
      "text": "You chose the first option. Great. Now I'm going to bring you to a random location",
      "actions": [
        {
          "name": "goto",
          "random": ["1", "4", "5"]
        }
      ]
    },
    "3": {
      "text": "You chose the second option. Well. Well",
      "actions": [
        {
          "name": "goto",
          "position": "0"
        }
      ]
    },
    "4": {
      "text": "Congratulations, you're in 4th place",
      "actions": [
        {
          "name": "goto",
          "position": "0"
        }
      ]
    },
    "5": {
      "text": "Congratulations, you're in 5th place",
      "actions": [
        {
          "name": "goto",
          "position": "0"
        }
      ]
    }
  },
```

### Story

```js
{
   // 1th Scene
  "id1Scene": {},
   // 2nd Scene
  "id2Scene": {}
  ...
}
```

### Scene

```js
{
  // The message is processed by the mustache template engine in the context of the user state
  "text": "Message for user",
  // Array of actions (instructions for processing input)
  "actions": [{}, {}]
}
```

### Action

```js
{
  // Name of the action. Built-in: 'goto' and 'set'
  "name": "goto",
  ...
}
```

## Build-in action
### goto

Change user position to ```position```. The position of the user corresponds to the ID of the scene.

```json
{
  "name": "goto",
  "position": "room7",
  "notFoundText": "Sorry, not found.."
}
```

### set

Sets the ```value``` field ```key``` user state

```json
{
  "name": "set",
  "key": "someField",
  "value": "some value",
  "notFoundText": "Sorry, not found.."
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
module.exports = function ({ action, message, state }) {
  return state;
};
```


## License

MIT © [antitim](http://vk.com/antitim)


[npm-image]: https://badge.fury.io/js/starbot-story-bot.svg
[npm-url]: https://npmjs.org/package/starbot-story-bot
[travis-image]: https://travis-ci.org/antitim/starbot-story-bot.svg?branch=master
[travis-url]: https://travis-ci.org/antitim/starbot-story-bot
