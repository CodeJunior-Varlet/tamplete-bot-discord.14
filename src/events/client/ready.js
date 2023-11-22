import { REST, Routes } from 'discord.js';

export default {
    name: 'ready',
    once: true,
    exec: async (client) => {
        const rest = new REST({ version: '9' }).setToken(client._token);

        try {
            const commands = Array.from(client.slashCommands.values()).map(cmd => cmd.data);

            for (const guild of client.guilds.cache.values()) {
                await rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: commands });
            }
            console.log('🐛 | Bot is online and commands registered!');
        } catch (err) {
            console.error('Error registering commands:', err);
        }
    }
};