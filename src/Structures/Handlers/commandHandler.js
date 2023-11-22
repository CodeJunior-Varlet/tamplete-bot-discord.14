import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default client => {
    const commandsPath = join(__dirname, '../../slashCommands');

    readdirSync(commandsPath).forEach(slashCommandCategory => {
        readdirSync(join(commandsPath, slashCommandCategory)).forEach(slashCommandFile => {
            import(`../../slashCommands/${slashCommandCategory}/${slashCommandFile}`)
                .then(module => {
                    const Command = new module.default();
                    client.slashCommands.set(Command.data.name, Command);
                })
                .catch(error => {
                    console.error(`Error loading command ${slashCommandFile}:`, error);
                });
        });
    });
};