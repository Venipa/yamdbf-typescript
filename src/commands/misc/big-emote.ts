import { Command } from "@yamdbf/core";
import { Message, Emoji, MessageEmbed } from "discord.js";
import { resolve } from "@yamdbf/core/bin/command/middleware/Resolve";
import { expect } from "@yamdbf/core/bin/command/middleware/Expect";

export class EnbiggenEmoteCommand extends Command {
  constructor() {
    super({
      name: "big-emote",
      aliases: ["big", "e"],
      desc: "Enbiggen emotes to the size it should be :3",
      usage: "<prefix>big <emote>",
      guildOnly: true,
      ratelimit: "1/1s",
    });
    this.use(resolve("emote: Emoji"));
    this.use(expect("emote: Emoji"));
  }
  async action(msg: Message, [emote]: [Emoji]) {
    return msg.channel.send(
      new MessageEmbed()
        .setDescription(`**Emote**: ${emote.name}`)
        .setImage(emote.url!)
    );
  }
}
