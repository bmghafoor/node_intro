const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`PATH DNE${err}`);
      process.exit(1);
    } else {
      //run the writeTo function that will either log the path or output the data depending on if --out is given
      writeTo(data, out);
    }
  });
}

async function webCat(url) {
    try {
      let res = await axios.get(url);
      // run the writeTo function that will either log the path or output the data depending on if --out is given
      writeTo(res,out);
    } catch (err) {
      console.error(`URL DNE: ${err}`);
      process.exit(1);
    }
  }


function writeTo(path, out) {
  // output to a file instead of logging it in console
  if (out){
    fs.writeFile(out, path, 'utf8', function(err){
      // if error is thrown, handle it
      if (err){
        console.log("ERROR Path DNE")
        process.exit(1)
      }
    })
  }
  // if no output command is given then just console.log the path
  else {
    console.log(path)
  }
  
}

// initialize variables
let path;
let out;

// if --out is given, then the writeTo function will output data
if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  // console.log the data
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}