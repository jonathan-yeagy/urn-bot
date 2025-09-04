const { EmbedBuilder } = require('discord.js');

// Get guild and channel from environment variables
const guildId = process.env.GUILD_ID;
const channelId = process.env.CHANNEL_ID;

// Get guild and channel helper function
async function getGuildAndChannel(bot) {
  const guild = await bot.guilds.fetch(guildId).catch(() => null);
  const channel = guild?.channels.cache.get(channelId) 
    || await guild?.channels.fetch(channelId).catch(() => null);
  
  return { guild, channel };
}


async function sendOnlineEmbed(bot) {
  const { guild, channel } = await getGuildAndChannel(bot);

  if (guild && channel && channel.isTextBased()) {
    // Get league name from Sleeper API
    
    const embed = new EmbedBuilder()
      .setTitle('Discord Bot is Online')
      .setDescription(`This bot is online and ready to use.`)
      .setColor(0x00BFFF)
      .setTimestamp();

    await channel.send({ embeds: [embed] });
    console.log(`Message sent: Discord Bot is Online`);
  } else {
    console.error('Could not find or send to the target channel in the specified guild.');
  }
}

module.exports = { sendOnlineEmbed };


