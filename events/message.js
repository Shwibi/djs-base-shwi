const Discord = require(`discord.js`);
const Event = require(`./eventBase`);
class Message extends Event {
  constructor() {
    super();
    this.initiated = false;
  }

  initiate(client) {
    this.start();
    this.initiated = true;
    this.client = client;
  }

  start() {

    // Message event
    this.Commands = new Discord.Collection();
    const commandFolders = this.fs.readdirSync(`./commands/`);
    for (const folder of commandFolders) {
      const commandFiles = this.fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith(`.js`));
      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        const commandName = command.name;
        if (!command.info.ignore) {
          this.Commands.set(commandName, command);
        }
      }
    }

    // On complete load
    this.Log(`Commands loaded!`);

  }

  newMessage(message) {

    // On new message
    if (message.author.bot) return;

    const prefix = this.config.bot.prefix;

    let smallCapMessage = message.content.toLowerCase();
    let args = smallCapMessage.split(/\s/);
    if (!smallCapMessage.startsWith(prefix)) return;
    let cm = args.shift().slice(prefix.length);

    if (cm) {

      let storedCommand = this.callCommand(cm, message, "cmd");
      if (!storedCommand) return;

      const permsRequired = this.cmd.permissions || ["SEND_MESSAGES"];
      let stateOfPerm = true;
      if (this.cmd.info.guildOnly && !message.guild) return;
      if (this.cmd.info.dmOnly && message.guild) return;
      for (let i = 0; i < permsRequired.length; i++) {
        if (permsRequired[i] == "DEV") {
          if (!this.config.dev.id.includes(message.author.id)) {
            stateOfPerm = false;
          }
        }
        else {
          if (!message.member.hasPermission(permsRequired[i])) stateOfPerm = false;
        }

      }
      if (stateOfPerm) {
        if (args[0] == "help") {
          message.channel.send(this.callCommand(cm, message, "help"));
          if (this.cmd.info.returnHelp) return;
        }
        this.callCommand(cm, message, "run");
      }

    }

  }

  callCommand(command, message, stat) {
    this.cmd = this.Commands.get(command) || this.Commands.find(c => c.aliases && c.aliases.includes(command));
    if (!this.cmd) {
      return this.LogError(`Invalid command called! @message.js/51`)
    }
    switch (stat) {
      case "run":
        this.cmd.run(message, this.client);
      case "help":
        return this.cmd.help;
      case "info":
        return this.cmd.info;
      case "cmd":
        return this.cmd;
      case "perms":
        return this.cmd.permissions;
    }
  }


}

const mes = new Message();

module.exports = (client, message) => {

  if (!mes.init) {
    mes.initiate(client);
  }
  mes.newMessage(message);

}