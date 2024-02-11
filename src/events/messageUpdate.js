const { Events } = require("discord.js");
const { replyWithMedia } = require("../media-fetch/message.js");

module.exports = {
    name: Events.MessageUpdate,
    execute: (oldMessage, newMessage) => {
        console.log(`Message updated: ${newMessage.content}`);
        replyWithMedia(newMessage).catch(console.error);
    },
};
