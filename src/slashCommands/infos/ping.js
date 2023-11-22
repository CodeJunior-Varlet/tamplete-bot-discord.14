export default class PingCommand {
    constructor() {
        this.data = {
            name: 'ping',
            description: 'Responds with pong and websocket latency.'
        };
    }

    async run(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const { ws: { ping } } = client;

        await interaction.editReply({ content: `Pong! WebSocket Latency: ${ping}ms` });
    }
}