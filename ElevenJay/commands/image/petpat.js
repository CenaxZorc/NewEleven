const Discord = require("discord.js");

module.exports = {
    name: "petpat",
    aliases: ["pat"],
    category: "fun",
    description: "GET Pet pat :D!",
    usage: "Petpat | <User>",
		run: async(client, message, args) => {

   const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    try {
    return message.channel.send(new Discord.MessageAttachment(encodeURI(`https://api.monkedev.com/canvas/petpet?imgUrl=${Member.user.displayAvatarURL({ format: "png" })}`), "Petpat.gif"));
    } catch (_) {
      return message.channel.send("Unable To Generate Petpat Or Something Went Wrong!");
    };
}
};