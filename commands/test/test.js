const { Command } = require(`../base/Command`);
class Test extends Command {

  exec(message) {
    message.channel.send(`Testing!`);
  }

}
const test = new Test();

module.exports = {
  name: "test",
  help: "Testing!",
  info: {
    returnHelp: false,
    ignore: false,
    guildOnly: true
  },
  permissions: ["SEND_MESSAGES"],
  run(message, client) {
    if (!test.init) {
      test.initiate(client);
    }
    test.exec(message);
  }
}