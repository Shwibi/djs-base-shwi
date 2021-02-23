const Shwi = require(`../../shwi`);

module.exports = class Command extends Shwi {

  constructor() {
    super();
    this.initiated = false;
  }

  call() {
    this.exec();
  }

  exec() {

  }

  init(client) {
    this.initiated = true;
    this.client = client;
  }

}