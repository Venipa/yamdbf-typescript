import { Command, Message } from "@yamdbf/core";
import { resolve } from "@yamdbf/core/bin/command/middleware/Resolve";
import { expect } from "@yamdbf/core/bin/command/middleware/Expect";

export class BotUsernameCommand extends Command {
    constructor() {
        super({
            name: 'username',
            usage: '<prefix>username <...name>',
            ownerOnly: true,
            hidden: true,
            group: 'admin',
            desc: 'Set Bot Username'
        })
        this.use(resolve('...name: String'));
        this.use(expect('...name: String'));
    }
    async action(msg: Message, [username]: [string]) {
        await this.client.user!.setUsername(username);
        msg.reply(`Username has been set to ${username}`);
    }
}