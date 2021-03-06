import { Client, YAMDBFOptions, ListenerUtil } from "@yamdbf/core";
import { ClientApplication } from "discord.js";


export class MavisClient extends Client {
  constructor(config: YAMDBFOptions) {
    super(config);
  }
}

export const createClient = (config: YAMDBFOptions) => {
  return new MavisClient(config);
};
