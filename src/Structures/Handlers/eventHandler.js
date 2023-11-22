import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default client => {
    const eventsPath = join(__dirname, '../../events');

    readdirSync(eventsPath).forEach(eventsCategory => {
        readdirSync(join(eventsPath, eventsCategory)).forEach(eventFile => {
            import(`../../events/${eventsCategory}/${eventFile}`)
                .then(module => {
                    const event = module.default;
                    if (event.once) {
                        client.once(event.name, (...args) => event.exec(client, ...args));
                    } else {
                        client.on(event.name, (...args) => event.exec(client, ...args));
                    }
                })
                .catch(error => {
                    console.error(`Error loading event ${eventFile}:`, error);
                });
        });
    });
};