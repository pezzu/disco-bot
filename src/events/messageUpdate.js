const { Events } = require("discord.js");
const { replyWithMedia } = require("../media-fetch/message.js");

module.exports = {
    name: Events.MessageUpdate,
    execute: (oldMessage, newMessage) => {
        if (oldMessage.content === newMessage.content) return;
        console.log(`Message updated: ${oldMessage.content} -> ${newMessage.content}`);
        replyWithMedia(newMessage).catch(console.error);
    },
};
