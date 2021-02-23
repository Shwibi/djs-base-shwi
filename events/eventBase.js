const Shwi = require(`../shwi`);

module.exports = class Event extends Shwi {
  start() {

  }
  call() {
    this.start();
  }

  set init(init) {
    this.initiated = init;
  }
  get init() {
    return this.initiated;
  }
}