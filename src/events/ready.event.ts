import { Event, Logger } from "@yamdbf/core";
import { MavisClient } from "../core/client";

const log = Logger.instance('Client');

export default class ReadyHandler extends Event<MavisClient> {
    constructor() {
        super('clientReady')
    }
    async action(...args: any[]) {
        log.info(`Logged in as ${this.client.user!.username}#${this.client.user!.discriminator}`);
        log.info(`Ping: ${this.client.ws.ping}ms`);
        log.info(`Guilds / Servers: ${this.client.guilds.cache.size}`);
    }
}