const { Events } = require("discord.js");
const { replyWithMedia } = require("../media-fetch/message.js");

module.exports = {
    name: Events.MessageUpdate,
    execute: (oldMessage, newMessage) => replyWithMedia(newMessage),
};
