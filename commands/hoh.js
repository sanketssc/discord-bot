const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hoh")
    .setDescription("Hall of heroes")
    .addIntegerOption((option) =>
      option.setName("t4deaths").setDescription("T4 deaths").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("t5deaths").setDescription("T5 deaths").setRequired(true)
    )
    .addAttachmentOption((option) =>
      option.setName("img").setDescription("asfasf").setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const img = interaction.options.getAttachment("img");
    const t4 = interaction.options.getInteger("t4deaths");
    const t5 = interaction.options.getInteger("t5deaths");
    const messageEmbed = new EmbedBuilder()
      .setTitle("Hall of heroes")
      .setDescription("This is the hall of heroes")
      .addFields({ name: "T4 Deaths", value: `${t4}` })
      .addFields({ name: "T5 Deaths", value: `${t5}` })
      .setImage(img.attachment)
      .setTimestamp();
    console.log(t4, t5, img.attachment);
    const messageReply = await interaction.editReply({
      embeds: [messageEmbed],
    });
  },
};
