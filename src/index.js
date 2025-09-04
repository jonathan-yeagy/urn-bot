// Only load .env in development (not in Docker)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildEmojisAndStickers
  ]
});

//login to bot
bot.login(process.env.DISCORD_TOKEN);

//on ready
bot.on('clientReady', async () => {
  console.log(`Logged in as ${bot.user.tag}`);

  bot.user.setStatus('online');
  

  bot.user.setActivity('your activity', { type: ActivityType.Watching });

  sendOnlineEmbed(bot);
});
