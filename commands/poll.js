const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Creates a poll")
    .addStringOption((option) =>
      option
        .setName("poll-details")
        .setDescription("Enter poll details")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("first").setDescription("first choice").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("second").setDescription("Second Choice").setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const first = interaction.options.getString("first");
    const second = interaction.options.getString("second");
    const messageReply = await interaction.editReply({
      content: `${interaction.options.getString(
        "poll-details"
      )} \n\n1️⃣ : ${first}\n2️⃣ : ${second}`,
    });
    messageReply.react("1️⃣");
    messageReply.react("2️⃣");
  },
};
