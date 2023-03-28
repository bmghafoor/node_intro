const fs = require('fs');
const process = require('process');

// reading the file path
function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    // if an error is thrown, must mean that an invalid path was entered
    if (err) { 
      console.error(`PATH DNE${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}
// take the 2nd input from the cmd
cat(process.argv[2]);