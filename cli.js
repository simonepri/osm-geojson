#!/usr/bin/env node

'use strict';

const fs = require('fs');
const pify = require('pify');

const osmGeoJson = require('.');

function stringify(geojson, beautify) {
  if (beautify) {
    return JSON.stringify(geojson, null, 2);
  }
  return JSON.stringify(geojson);
}

function help() {
  const help = ` Usage
    $ osm-geojson <osmId>
  Options
    -p --pretty                   To beautify the output.
    -l  --list                    To provide a list of osmId.
  Examples
    $ osm-geojson 365331
    $ osm-geojson -p 365331
    $ osm-geojson -p 365331 >> filename.geojson
    $ osm-geojson -l 365331:ita 148838:usa
`;
  console.log(help);

  return Promise.resolve();
}

function list(osmidmap, beautify) {
  const promises = [];

  for (const country of Object.keys(osmidmap)) {
    promises.push(
      osmGeoJson
        .get(osmidmap[country])
        .then(geojson =>
          pify(fs.writeFile)(country + '.geojson', stringify(geojson, beautify))
        )
    );
  }

  return Promise.all(promises);
}

function get(osmid, beautify) {
  return osmGeoJson.get(osmid).then(geojson => {
    console.log(stringify(geojson, beautify));
  });
}

function run() {
  const argv = {_: []};

  // Parse flags
  process.argv.slice(2).forEach(arg => {
    switch (arg) {
      case '-p':
      case '--pretty-print':
        argv.beautify = true;
        break;
      case '-l':
      case '--list':
        argv.list = true;
        break;

      default:
        if (!arg.startsWith('-')) {
          argv._.push(arg);
        }
        break;
    }
  });

  // Validate argv list
  if (argv.list) {
    argv._ = argv._.filter(arg => /\d+:.+/.test(arg));
    if (argv._.length === 0) {
      argv.help = true;
    }
  } else {
    argv._ = argv._.filter(arg => /\d+/.test(arg));
    if (argv._.length !== 1) {
      argv.help = true;
    }
  }

  // Choose the right handler
  return Promise.resolve()
    .then(() => {
      if (argv.help) {
        return help();
      }
      if (argv.list) {
        const map = {};
        argv._.forEach(arg => {
          const [osmid, country] = arg.split(':');
          map[country] = osmid;
        });
        return list(map, argv.beautify);
      }
      const osmid = argv._[0];
      return get(osmid, argv.beautify);
    })
    .catch(err => {
      console.error('\n❌ ' + err);
    });
}

run();
