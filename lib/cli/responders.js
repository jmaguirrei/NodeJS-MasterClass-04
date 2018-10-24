

// Deps
const formatters = require('./formatters');
const commands = require('./commands');
const _data = require('../data');
const menuItems = require('../../.data/menu/items');


// Help function
function help() {

  // Show a header for the help page that is as wide as the screen
  formatters.horizontalLine();
  formatters.centered('CLI MANUAL');
  formatters.horizontalLine();
  formatters.verticalSpace(2);

  // Show each command, followed by its explanation, in white and yellow respectively
  commands.forEach(command => {
    const { name, desc } = command;
    const line = '      \x1b[33m ' + name + '      \x1b[0m';
    formatters.columns(line, desc);
    formatters.verticalSpace();
  });

  formatters.verticalSpace(1);
  formatters.horizontalLine();
}

// Exit
function exit() {
  process.exit(0);
}

// List
function list(typeOfData) {
  return async function ({ callback }) {

    // Show a header for the help page that is as wide as the screen
    formatters.horizontalLine();
    formatters.centered(typeOfData === 'menu' ? 'Pollos Hermanos MENU' : `List of ${typeOfData}`);
    formatters.horizontalLine();
    formatters.verticalSpace();

    if (typeOfData === 'menu') {
      menuItems.forEach(item => {
        const { type, price, name } = item;
        formatters.columns(`${type} - ${name}`, `$ ${price}.00`);
      });
      callback();
    } else {
      const fileNames = await _data.list(typeOfData);
      const validFileNames = fileNames.filter(name => name !== '.DS_Store');
      const promises = validFileNames.map(fileName => _data.read(typeOfData, fileName));
      Promise.all(promises)
        .then(filesContent => {
          return filesContent.map(fileContent => {
            const leftColumn = typeOfData === 'users' ? fileContent.email : fileContent.order.id;
            const rightColumn = typeOfData === 'users' ? fileContent.name : fileContent.user.email;
            const now = Date.now();
            const isInLast24Hours = now - fileContent.timestamp < 24 * 60 * 60 * 1000;
            if (isInLast24Hours) formatters.columns(leftColumn, rightColumn);
          });
        })
        .then(callback)
        .catch(() => {
          console.log('Oooops, something went wrong :(');
          callback();
        });
    }

  };
}

// More
function more(typeOfData) {
  return function ({ str, callback }) {

    // Show a header for the help page that is as wide as the screen
    formatters.horizontalLine();
    formatters.centered(`More info on ${typeOfData}`);
    formatters.horizontalLine();
    formatters.verticalSpace();

    const findIndex = str.indexOf('--');
    const args = str.substr(findIndex + 2, 100000).trim();

    _data.read(typeOfData, args)
    .then(moreInfo => {
      delete moreInfo.hashedPassword;
      console.dir(moreInfo, { colors: true });
      callback();
    })
    .catch(() => {
      console.log('Oooops, no data to show :(');
      callback();
    });


  };
}


module.exports = {

  help,
  exit,
  'list users': list('users'),
  'more user info': more('users'),
  'list menu': list('menu'),
  'list orders': list('orders'),
  'more order info': more('orders'),

};
