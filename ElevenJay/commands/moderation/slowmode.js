const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const marvalx = require("marvalx");

module.exports = {
  name: "slowmode",
  description: "apply slowmode on your channel!",
  aliases: ["slow"],

  
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return;
    if (!args[0]) {
      message.channel.setRateLimitPerUser(0);
      message.channel.send({content: "Slow mode set to: DEFAULT"});
    }

    const raw = args[0];
    const milliseconds = marvalx(raw);

    if (isNaN(milliseconds))
      return message.channel.send({content: `That is not a number!`});

    if (milliseconds < 1000)
      return message.channel.send({content: `The minimum slowmode time is 1 second.`});

    message.channel.setRateLimitPerUser(milliseconds / 1000);
    message.channel.send({content:
      `The slowmode for this channel is now set to ${marvalx(milliseconds, {long: true})}`
    }
    );
  },
};
