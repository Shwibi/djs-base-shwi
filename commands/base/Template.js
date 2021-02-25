// Template for commands
const { Command } = require(`../base/Command`); // Base class for commands

class Main extends Command {

  // Main command class inherited from command

  exec(message) {

    // Execution of command
    /*
     * message: The main message sent by the user
     * Stores details about the user and stuff
     */

  }

}

const MainCommand = new Main(); // Particular instance of command class

// Exporting details
module.exports = {
  name: "",
  description: "",
  permissions: [""], // Permissions required by user to use this command; DEV for developer only
  info: {
    // Info object
    ignore: true, // Whether to ignore this command or not
    guildOnly: false, // Command can only be used in guild
    dmOnly: false, // Only in dms
    returnHelp: true // Do not execute command if user is asking for help
  },
  run(message, client) {
    // Called by message event
    if (!MainCommand.init) {
      MainCommand.initiate(client); // Initiate command if not already initiated
    }
    MainCommand.exec(message); // Carry out the final function
  }
}

