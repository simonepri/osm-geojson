#!/usr/bin/env node

'use strict';

const osmGeoJson = require('./index.js');
const fs = require('fs');

const argv = { _: [] };

process.argv.slice(2).forEach((arg) => {
  switch (arg) {
    case '-h':
    case '--help':
      console.log('Usage: osm-geojson [options] osmid:filename.geojson...');
      console.log('Options:');
      console.log('   -h --help Show usage');
      console.log('   -p --pretty-print Pretty print GeoJSON');
      process.exit();
      break;

    case '-p':
    case '--pretty-print':
      argv['pretty-print'] = true;
      break;

    default:
      if (!arg.startsWith('-')) {
        argv._.push(arg);
      }
      break;
  }
})

argv._.forEach((task) => {
  let [relation, file] =  task.split(':')
  osmGeoJson.get(relation)
    .then((geojson) => {
      const geojsonString = argv['pretty-print'] ? JSON.stringify(geojson, null, 2) : JSON.stringify(geojson);
      if (file === '-') {
        process.stdout.write(geojsonString)
      } else {
        fs.writeFile(file, geojsonString, (err) => {
          if (err) throw err;
        })
      }
    }, (err) => { console.error(err) ; })
});
