import { createClient } from "./core/client";
import { resolve } from "path";
import { Logger } from "@yamdbf/core";

(async () => {
  const config: any = await import("../config.json");
  const log = Logger.instance("Client");
  const app = createClient({
    owner: config.owner,
    commandsDir: resolve(__dirname, "commands"),
    eventsDir: resolve(__dirname, "events"),
    localeDir: resolve(__dirname, "locales"),
    token: config.token
  });
  await app.login(config.token);
})();
