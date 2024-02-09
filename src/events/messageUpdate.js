const { Events } = require("discord.js");
const { processMessage } = require("./message.js");

module.exports = {
    name: Events.MessageUpdate,
    execute: (oldMessage, newMessage) => processMessage(newMessage),
};
