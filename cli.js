#!/usr/bin/env node

const osmGeoJson = require('./index.js');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2), {
  alias: { 'h': 'help' },
  boolean: ['h', 'pretty']
});

if (argv.h) {
  console.log('Usage: osm-geojson [options] osmid:filename.geojson...')
  console.log('Options:')
  console.log('   -h --help Show usage')
  console.log('   --pretty Pretty print GeoJSON')
}

argv._.forEach((task) => {
  let [relation, file] =  task.split(':')
  osmGeoJson.get(relation)
    .then((geojson) => {
      const geojsonString = argv.pretty ? JSON.stringify(geojson, null, 2) : JSON.stringify(geojson);
      if (file === '-') {
        process.stdout.write(geojsonString)
      } else {
        fs.writeFile(file, geojsonString, (err) => {
          if (err) throw err;
        })
      }
    }, (err) => { console.error(err) ; })
});
