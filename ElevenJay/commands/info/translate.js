const { MessageEmbed } = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = {
  name: "translate",
  category: "main",
  description: "translate message",
  run: async (client, message, args) => {
        const result = await translate(args.slice(1).join(" "), { to: args[0] });
				const res = await args.join(" ")
        if(!res) return message.channel.send('Please Select The Language **Ex:**`e?translate <language> test`')

if(!args[1]) {
      return message.channel.send("Please Select The Language **Ex:**`e?translate <language> test`")
    }

        const embed = new MessageEmbed()
            .setDescription(result.text)
            .setColor("BLACK")
            .setFooter(`Translation from ${result.from.language.iso.toUpperCase()} to ${args[0]}`)
            .setTimestamp()
            .setTitle("Google Translate");

        message.channel.send({ embeds: [embed] });
    }
};