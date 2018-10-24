/*
 * Helpers for various tasks
 *
 */

// Dependencies
const readline = require('readline');
const nodeEvents = require('events');
class Events extends nodeEvents {}

// Own modules
const commands = require('./commands');
const processInput = require('./processInput');
const responders = require('./responders');

// Cli object
const cli = {
  events: new Events(),
  processInput,
  responders,
};

// Input handlers
commands.forEach(command => {
  cli.events.on(command.name, ({ str, callback }) => {
    cli.responders[command.name]({ str, callback });
  });
});

cli.init = function () {

  // Send to console, in dark blue
  console.log('\x1b[34m%s\x1b[0m','The CLI is running');

  // Start the interface
  const _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

  // Create an initial prompt
  _interface.prompt();

  // Handle each line of input separately
  _interface.on('line', function (str) {
    cli.processInput(str, () => {
      console.log();
      _interface.prompt();
    });
  });

  // If the user stops the CLI, kill the associated process
  _interface.on('close', function () {
    process.exit(0);
  });

};

module.exports = cli;
