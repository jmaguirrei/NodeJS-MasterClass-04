
// Deps
const commands = require('./commands');

// processInput
module.exports = function processInput(str = '', callback) {

  // Only process the input if the user actually wrote something, otherwise ignore it
  if (str.length > 0) {
    // Codify the unique strings that identify the different unique questions allowed be the asked


    // Go through the possible inputs, emit event when a match is found
    const findMatch = commands.find(item => {
      return str.toLowerCase().indexOf(item.name) > -1;
    });

    if (findMatch) {
      this.events.emit(findMatch.name, { str, callback });
    } else {
      console.log('Sorry, try again');
    }
  }

};
