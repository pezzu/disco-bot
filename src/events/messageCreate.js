const { Events } = require("discord.js");
const { processMessage } = require("./message.js");

module.exports = {
    name: Events.MessageCreate,
    execute: processMessage,
};
