const Discord = require('discord.js');
const superagent = require('superagent');


module.exports = {
   
        name: "waifu",
        aliases: ["waifu"],
        category: "anime",
        description: "anime search",
    run: async (bot, message, args) => {
        try {
            superagent
              .get("https://nekos.life/api/v2/img/waifu")
              .end((err, response) => {
                const embed = new Discord.MessageEmbed()
                .setTitle("Waifu")
                  .setDescription(message.author.toString())
                  .setImage(response.body.url)
                  .setColor("BLACK")
              .setTimestamp()
                  .setFooter('© Zxwar');
                message.channel.send(embed);
              })
              .catch(err =>
                message.channel.send({
                  embed: {
                    color: "BLACK",
                    description: "Something went wrong... :cry:"
                  }
                })
              );
            }catch(err){
              console.log(err)
            }
    }
}