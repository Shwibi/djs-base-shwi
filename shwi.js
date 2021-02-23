const colors = require(`colors`);
const config = require(`./config/config.json`);
const fs = require(`fs`);
const discord = require(`discord.js`);
class Shwi {
  constructor() {
    this.config = config;
    this.colors = colors;
    this.fs = fs;
    this.djs = discord;
  }
  Log(input) {
    console.log(`${config.app.console} `.yellow + input);
  }
  LogError(input) {
    this.Log(input.red);
  }

  startTest() {
    this.Log(`Testing!`.rainbow);
  }
}
module.exports = Shwi;

// Testing here
const shwi = new Shwi();
shwi.startTest();