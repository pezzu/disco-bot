const fs = require("fs");

function processMessage(message) {
    console.log(`messagge received! ${message.content}`);

    if (message.author.bot) return;

    if (message.content.startsWith("https://twitter.com/")) {
        message.reply({ files: [fs.createReadStream(__dirname + "/../../1.mp4")] });
    }
}

module.exports = { processMessage };
