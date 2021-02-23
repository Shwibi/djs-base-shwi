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

  initiate(client) {
    this.initiated = true;
    this.client = client;
  }

  get init() {
    return this.initiated;
  }
  set init(inited) {
    this.initiated = inited;
  }

}