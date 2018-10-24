

module.exports = {

  // Create a vertical space
  verticalSpace(lines = 1) {
    for (let i = 0; i < lines; i++) {
      console.log('');
    }
  },

  // Create a horizontal line across the screen
  horizontalLine() {

    // Get the available screen size
    const width = process.stdout.columns;

    // Put in enough dashes to go across the screen
    let line = '';
    for (let i = 0; i < width; i++) {
      line += '-';
    }
    console.log(line);

  },

  // Create centered text on the screen
  centered(str = '') {

    if (str.length > 0) {

      // Get the available screen size
      const width = process.stdout.columns;

      // Calculate the left padding there should be
      const leftPadding = Math.floor((width - str.length) / 2);

      // Put in left padded spaces before the string itself
      let line = '';
      for (let i = 0; i < leftPadding; i++) {
        line += ' ';
      }
      line += str;
      console.log(line);
    }

  },

  // 2 columns with padding
  columns(item, desc) {
    let line = item;
    const padding = 60 - item.length;
    for (let i = 0; i < padding; i++) {
      line += ' ';
    }
    line += desc;
    console.log(line);
  },

};
