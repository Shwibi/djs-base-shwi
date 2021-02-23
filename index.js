require(`dotenv`).config();
const Discord = require(`discord.js`);
const fs = require(`fs`);
const Client = new Discord.Client();
const Shwi = require(`./shwi`);
const config = require(`./config/config.json`);

Client.login(process.env.TOKEN);

class Main extends Shwi {

  start() {
    this.Log(`Application started! \nName: ${config.app.name}@v${config.app.version}`);
    //App started

    //Reading events
    fs.readdir(`./events/`, "utf-8", (err, files) => {
      if (err) return this.LogError(err);
      if (files) {
        files.forEach(file => {
          if (!file.endsWith(`.js`)) return;
          const event = require(`./events/${file}`);
          const eventName = file.split(`.`)[0];
          this.Log(`Loaded ${eventName}!`);
          Client.on(eventName, event.bind(null, Client));
        })
      }
    })
  }

}

const main = new Main();
main.start();