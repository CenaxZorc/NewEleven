const { token } = require("./config.json");
const { Collection, Client, Attachment, Discord, Intents } = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const client = new Client({
  disableEveryone: true ,
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES]
});
const fetch = require("node-fetch");
const { Database } = require("quickmongo");
const db = new Database(process.env.ZarcDB);
const dbo = require('old-wio.db');
const dbx = require('quick.db');
const mongoose = require('mongoose');
const colors = require("colors");
const fs = require('fs');
const ms = require("ms");
const path = require("path");
const axios = require("axios");
const moment = require("moment");
const disbut = require("discord-buttons")
disbut(client)
 require('discord-reply');
const cwk = require ("cwk-api");

const Logger = require("./modules/Logger");

client.commands = new Collection();
client.aliases = new Collection();
client.slash = new discord.Collection();

client.logger = Logger;

["command", "events", "slash"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    client.user.setStatus("idle");
    console.log("ElevenJay Now Online")
});

db.on("ready", () => {
	console.log("MongoDB Connected")
});

mongoose.connect(process.env.ZarcDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(console.log('MongoDB ✅'));


client.login(token).catch(err => console.error('Error [TOKEN_INVALID]: An invalid token was provided.'))