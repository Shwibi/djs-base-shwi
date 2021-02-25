const { Command } = require(`../base/Command`);

class Ping extends Command {
  exec(message) {
    message.channel.send(
      `Loading data...`
    ).then(
      msg => {
        msg.edit(`Data loaded!`)
        const PingEmbed = new this.djs.MessageEmbed()
          .setTitle(`Ping!`)
          .setDescription(`Client API Ping: ${this.client.ws.ping}ms | Latence: ${msg.createdTimestamp - message.createdTimestamp}ms`)
          .setColor(`RANDOM`);
        msg.edit(PingEmbed);
      }
    )
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