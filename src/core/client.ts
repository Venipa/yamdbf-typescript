import { Client, YAMDBFOptions } from "@yamdbf/core";


export class MavisClient extends Client {
  constructor(config: YAMDBFOptions) {
    super(config);
  }
}

export const createClient = (config: YAMDBFOptions) => {
  return new MavisClient(config);
};
