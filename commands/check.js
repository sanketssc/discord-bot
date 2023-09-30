const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check")
    .setDescription("checks if you are verified"),
  async execute(interaction) {
    const hasRole = await interaction.member.roles.cache.some(
      (r) => r.name === "Member"
    );
    if (hasRole) {
      return await interaction.reply({
        content: "You are verified",
        ephemeral: true,
      });
    } else {
      return await interaction.reply({
        content:
          "You are not veriefied pls use </verify:1141617403101454387> and get yourself verified",
        ephemeral: true,
      });
    }
  },
};
