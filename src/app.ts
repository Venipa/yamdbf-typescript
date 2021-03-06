import { createClient } from "./core/client";
import { resolve } from "path";
import config from '../config.json';
import { User } from "discord.js";

(async () => {
  const app = createClient({
    owner: config.owner,
    commandsDir: resolve(__dirname, "commands"),
    eventsDir: resolve(__dirname, "events"),
    localeDir: resolve(__dirname, "locales"),
    token: config.token
  });
  await app.login(config.token);  
  console.log("Guilds: " + app.guilds.cache.size)
  console.log("Owner: " + ((await app.fetchApplication()).owner as User).username)
})();