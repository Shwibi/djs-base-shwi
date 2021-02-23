const Event = require(`./eventBase`);
class Ready extends Event {
  constructor(client) {
    super();
    this.client = client;
  }
  start() {
    this.Log(`Bot online as ${this.client.user.tag}!`.green);
  }
}

module.exports = client => {

  const ready = new Ready(client);
  ready.call();

}

module.exports.ready = Ready;

