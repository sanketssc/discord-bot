const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong")
    .addAttachmentOption((option) =>
      option.setName("img").setDescription("asfasf").setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const img = interaction.options.getAttachment("img");
    console.log(img);
    const ping = Date.now() - interaction.createdTimestamp;
    const messageReply = await interaction.editReply({
      content: `Pong! ${ping}ms`,
    });
  },
};
