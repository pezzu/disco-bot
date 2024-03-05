const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits } = require("discord.js");
const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

const ssm = new SSMClient({ region: "us-east-1" });
const param = {
    Name: "/prod/disco-bot/container-registry-credentials",
    WithDecryption: false,
};

ssm.send(new GetParameterCommand(param))
    .then((data) => {
        client.login(data.Parameter.Value);
    })
    .catch((error) => {
        console.error(error);
    });
