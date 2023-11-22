export default class PingCommand {
    constructor() {
        this.data = {
            name: 'test',
            description: 'Command for test'
        };
    }

    async run(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const { ws: { ping } } = client;

        await interaction.editReply({ content: `WebSocket Latency: ${ping}ms` });
    }
}