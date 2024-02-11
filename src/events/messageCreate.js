const { Events } = require("discord.js");
const { replyWithMedia } = require("../media-fetch/message.js");

module.exports = {
    name: Events.MessageCreate,
    execute: (message) => {
        console.log(`Message received: ${message.content}`);
        replyWithMedia(message).catch(console.error);
    },
};
