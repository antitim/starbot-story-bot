const mustache = require('mustache');
const EventEmitter = require('events');

class StoryBot extends EventEmitter {
  constructor (settings) {
    super(settings);

    /**
     * Built-in modules for input processing
     */
    this.modules = {
      ...settings.modules || {},
      goto: require('./modules/goto'),
      set: require('./modules/set')
    };

    this.unrecognizedText = settings.unrecognizedText || 'Not found';
    this.story = settings.story;
  }

  /**
   * Removes special characters
   * @param {String} text
   * @returns {String}
   */
  escapeText (text) {
    text = text.replace(/[{}]/g, '');
    return text;
  };

  async message (message) {
    const messageText = this.escapeText(message.text);
    let state = await this.store.get(message.client);

    if (!state) {
      state = {
        position: '0',
        data: {}
      };
    } else {
      const scene = this.story[state.position];

      for (let action of scene.actions) {
        try {
          state = this.modules[action.name]({
            action,
            message: messageText,
            state
          });
        } catch (err) {
          this.emit('message', {
            client: message.client,
            text: err.message || this.unrecognizedText
          });
          break;
        };
      };
    }

    /**
     * Save user state
     */
    await this.store.set(message.client, state);

    // Prepare message for user
    const scene = this.story[state.position];
    const text = mustache.render(scene.text, state.data);

    this.emit('message', {
      client: message.client,
      text
    });
  }
};

module.exports = StoryBot;
