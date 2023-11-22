import Client from "./src/Structures/Client.js";

const client = new Client({ debug: true });

try {
    client.run();
} catch (error) {
    console.error("Error starting the client:", error);
}