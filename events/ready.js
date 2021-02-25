const Event = require(`./eventBase`);
class Ready extends Event {

  Type(input) {
    /*
     * SUB_COMMAND	1
     * SUB_COMMAND_GROUP	2
     * STRING	3
     * INTEGER	4
     * BOOLEAN	5
     * USER	6
     * CHANNEL	7
     * ROLE	8
     */
    if (!this.typeInit) {
      this.inputTypeConverter = {
        sc: 1,
        subc: 1,
        sub_command: 1,
        scg: 2,
        subcg: 2,
        sub_command_group: 2,
        str: 3,
        string: 3,
        int: 4,
        integer: 4,
        bool: 5,
        boolean: 5,
        user: 6,
        channel: 7,
        chan: 7,
        role: 8
      };
      this.typeInit = true;
    }
    return this.inputTypeConverter[input];

  }

  constructor(client) {
    super();
    this.client = client;
    this.typeInit = false;
  }
  start() {
    this.Log(`Bot online as ${this.client.user.tag}!`.green);
    this.slashAPI();
  }

  LoadCommands(arrayOfCommandData) {
    this.Log(`Loading ${arrayOfCommandData.length} commands!`);
    let client = this.client;
    let commands = arrayOfCommandData;
    for (let i = 0; i < commands.length; i++) {
      client.api.applications(client.user.id).guilds('797025994044342292').commands.post({ data: commands[i] });
      this.Log(`Loaded slash command: ${i + 1}(n) @ ${i}(array)`);
    }
    this.Log('Slash Commands loaded!');
  }

  slashAPI() {
    let client = this.client;
    this.slashCommandData = [];

    this.slashCommandData.push({
      name: 'hello',
      description: 'Replies with Hello!'
    });
    let slashCommandRead = this.fs.readdirSync(`./commands/slash/`).filter(f => f.endsWith('.json'));
    for (const file of slashCommandRead) {
      let slashCommand = require(`../commands/slash/${file}`);
      this.slashCommandData.push(slashCommand);
    }
    this.LoadCommands(this.slashCommandData);


    // this.Log('Creating Slash API!');
    // client.api.applications(client.user.id).guilds('797025994044342292').commands.post({
    //   data: {
    //     name: 'hello',
    //     description: 'Replies with Hello!'
    //   }
    // }); // Simple hello command post

    // let testCommand = require(`../commands/slash/testCommand.json`);
    // client.api.applications(client.user.id).guilds('797025994044342292').commands.post({
    //   data: testCommand
    // });
    // this.Log('Created Slash API!');

    client.ws.on('INTERACTION_CREATE', async interaction => {

      const command = interaction.data.name.toLowerCase();
      const args = interaction.data.options;

      if (command == "hello") {

        // Create a new callback from interaction
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: this.Type("str"),
            data: {
              content: "Hello!" // Send hellow
            }
          }
        });

      }

    })

  }
}

module.exports = client => {

  const ready = new Ready(client);
  ready.call();

}

module.exports.ready = Ready;

