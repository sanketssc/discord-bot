const {REST, Routes} = require('discord.js');
require("dotenv").config();
const fs = require('fs');

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
console.log(commandFiles)
for (const file of commandFiles) {
    console.log(file)
    const command = require(`./commands/${file}`)
    if('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    }else {
        console.log(`[WARNING]: The command at ${file} is missing execute or data property `)
    }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
        console.log(commands)

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();