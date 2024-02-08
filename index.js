require("dotenv").config();
const { Client, Events, GatewayIntentBits, ActivityFlagsBitField } = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// When the client is ready, run this code
client.once(Events.ClientReady, () => {
    console.log("Ready!");
});

// This event will run whenever a message is received
client.on(Events.MessageCreate, (message) => {
    // Log the message content to the console
    console.log("content", message.content);
});

client.login(process.env.DISCORD_BOT_TOKEN);
