export default {
    name: 'interactionCreate',
    exec: async (client, interaction) => {
        if (interaction.isCommand()) {
            const command = client.slashCommands.get(interaction.commandName);

            if (!command) {
                return interaction.reply({ content: '**Error**: Command not found.', ephemeral: true });
            }

            try {
                await command.run(client, interaction);
            } catch (error) {
                console.error('Error executing command:', error);
                await interaction.reply({ content: '**Error**: There was a problem executing the command.', ephemeral: true });
            }
        }
    },
};