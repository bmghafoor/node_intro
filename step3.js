const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`PATH DNE${err}`);
      process.exit(1);
    } else {
      writeTo(data, out);
    }
  });
}

async function webCat(url) {
    try {
      let resp = await axios.get(url);
      writeTo(resp,out);
    } catch (err) {
      console.error(`URL DNE: ${err}`);
      process.exit(1);
    }
  }


function writeTo(path, out) {
  if (out){
    fs.writeFile(out, path, 'utf8', function(err){
      if (err){
        console.log("ERROR")
        process.exit(1)
      }
    })
  }
  else {
    console.log(path)
  }
  
}

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}