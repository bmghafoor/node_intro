const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`PATH DNE${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
    try {
      // try getting data from url
      let res = await axios.get(url);
      console.log(res.data);
      // if error thrown, send a message 
    } catch (err) {
      console.error(`URL DNE: ${err}`);
      process.exit(1);
    }
  }

  let path = process.argv[2]; 

  if (path.slice(0, 4) === 'http') {
    webCat(path);
  } else {
    cat(path);
  }