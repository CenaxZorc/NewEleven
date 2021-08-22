const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const marvalx = require("marvalx");
module.exports = {
  name: "lock",
  description: "Lock a channel",
 

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return;
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
      return message.lineReply(`I am missing permission: **MANAGE_CHANNELS**.`);
    const channel =
        message.channel ||
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]) ||
      message.guild.channels.cache.find((u) => u.name === args[0]);
    if (!channel)
      return message.reply({content:
        `Couldn't find that channel or no channel mentioned.`
      }
      );

    let msg = await message.channel.send({content: `Please wait`});

    try {
      channel.permissionOverwrites.edit(
        message.guild.roles.cache.find(
          (e) => e.name.toLowerCase().trim() === "@everyone"
        ),
        {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
        }
      );
      msg.edit({content:`🔐 Locked ${channel.name}`});
    } catch (e) {
      message.channel.send(`An error has occured: ${e}`);
    }
  },
};
