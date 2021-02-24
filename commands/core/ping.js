const { Command } = require(`../base/Command`);

class Ping extends Command {
  exec(message) {
    const PingEmbed = new this.djs.MessageEmbed()
      .setTitle(`Ping!`)
      .setDescription(`Client API Ping: ${this.client.ws.ping}ms`)
      .setColor(`RANDOM`);
    message.channel.send(PingEmbed);
  }
}

const ping = new Ping();

module.exports = {
  name: "ping",
  help: "Ping!",
  permissions: ["SEND_MESSAGES"],
  info: {
    returnHelp: true,
    ignore: false,
    guildOnly: true
  },
  run(message, client) {
    if (!ping.init) {
      ping.initiate(client);
    }
    ping.exec(message);
  }
}