// @ts-check

import { Client, Intents } from "discord.js";
import readline from "readline";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

// create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (question) =>
  new Promise((resolve, reject) =>
    rl.question(`${question} `, (answer) => {
      resolve(answer);
    })
  );

async function main() {
  const token = await question("Enter your token:");
  client.login(token);

  client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);

    while (true) {
      const guildId = await question("Enter the guild id:");

      if (isNaN(Number(guildId))) {
        console.log("Goodbye JOJO");
        process.exit(0);
      }

      console.log(`Purging Commands of ${guildId}`);
      const guild = client.guilds.cache.get(guildId);

      const commands = await guild.commands.fetch();

      // Delete all slash commands
      commands.forEach((command) => {
        console.log(`Removing ${command.name}`);
        command.delete();
      });
    }
  });
}

main();
