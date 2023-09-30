require("dotenv").config();

const fs = require("fs");
const {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  Partials,
} = require("discord.js");
const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}
// console.log(client.commands);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  // console.log(reaction);
  // console.log(user);
  let cId = reaction.emoji.name;
  if (cId !== "❤️") return;
  const guild = await client.guilds.cache.get(reaction.message.guildId);
  // console.log(guild);
  const member = await guild.members.cache.get(user.id);
  // console.log(member);
  const role = await guild.roles.cache.find((r) => r.name === "Member");
  // console.log(role);
  try {
    await member.roles.add(role);
  } catch (error) {
    console.log(error);
    return;
  }
});

client.on(Events.MessageReactionRemove, async (reaction, user) => {
  // console.log(reaction);
  // console.log(user);
  let cId = reaction.emoji.name;
  if (cId !== "❤️") return;
  const guild = await client.guilds.cache.get(reaction.message.guildId);
  console.log(guild);
  const member = await guild.members.cache.get(user.id);
  console.log(member);
  const role = await guild.roles.cache.find((r) => r.name === "Member");
  console.log(role);
  try {
    await member.roles.remove(role);
  } catch (error) {
    console.log(error);
    return;
  }
});
