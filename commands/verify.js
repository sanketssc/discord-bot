const { SlashCommandBuilder } = require("discord.js");

const obj = {
  email: "test",
  discordUsername: "invok3r",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("verifies you ")
    .addStringOption((option) => {
      return option
        .setName("email")
        .setDescription("email registered on website")
        .setRequired(true);
    }),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.editReply({
      content: "checking info please wait",
      ephemeral: true,
    });
    const email = interaction.options.getString("email");
    const username = interaction.member.user.username;
    const hasRole = await interaction.member.roles.cache.some(
      (r) => r.name === "Member"
    );

    if (hasRole) {
      return interaction.editReply({
        content: "You are already verified",
        ephemeral: true,
      });
    }

    if (username !== obj.discordUsername) {
      interaction.editReply({ content: "username mismatch", ephemeral: true });
    } else if (email !== obj.email) {
      interaction.editReply({ content: "email mismatch", ephemeral: true });
    } else {
      const role = interaction.member.guild.roles.cache.find(
        (role) => role.name === "Member"
      );
      //   console.log(role);

      await interaction.member.roles.add(role);
      //  // get all user roles
      //   let rolemap = interaction.member.roles.cache.map((r) => r.name).join(",");
      //   console.log(rolemap);
      const hasRole = await interaction.member.roles.cache.some(
        (r) => r.name === "Member"
      );
      if (hasRole) {
        await interaction.editReply({
          content: `Granted role <@&${role.id}>`,
          ephemeral: true,
        });
        let message = await interaction.channel.send({
          content: `<@${interaction.member.id}> You are now verified`,
        });
      } else {
        await interaction.editReply({
          content: "There was error granting role please contact Admin",
          ephemeral: true,
        });
      }
    }

    console.log(email, username);
  },
};
