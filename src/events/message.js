const { Events } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        console.log("content", message.content);
    },
};
