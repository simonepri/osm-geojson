<p align="center">
  <a href="https://github.com/simonepri/osm-geojson">
    <img src="https://github.com/simonepri/osm-geojson/raw/master/media/osm-geojson.png" alt="osm-geojson" width="340"/>
  </a>
</p>
<p align="center">
  <!-- Version - npm -->
  <a href="https://www.npmjs.com/package/osm-geojson">
    <img src="https://img.shields.io/npm/v/osm-geojson.svg" alt="Latest version on npm" />
  </a>
  <!-- Downloads - npm -->
  <a href="https://npm-stat.com/charts.html?package=osm-geojson">
    <img src="https://img.shields.io/npm/dt/osm-geojson.svg" alt="Downloads on npm" />
  </a>
  <!-- License - MIT -->
  <a href="https://github.com/simonepri/osm-geojson/tree/master/license">
    <img src="https://img.shields.io/github/license/simonepri/osm-geojson.svg" alt="Project license" />
  </a>

  <br/>

  <!-- Lint -->
  <a href="https://github.com/simonepri/osm-geojson/actions?query=workflow:lint+branch:master">
    <img src="https://github.com/simonepri/osm-geojson/workflows/lint/badge.svg?branch=master" alt="Lint status" />
  </a>
  <!-- Test - macOS -->
  <a href="https://github.com/simonepri/osm-geojson/actions?query=workflow:test-macos+branch:master">
    <img src="https://github.com/simonepri/osm-geojson/workflows/test-macos/badge.svg?branch=master" alt="Test macOS status" />
  </a>
  <!-- Test - Ubuntu -->
  <a href="https://github.com/simonepri/osm-geojson/actions?query=workflow:test-ubuntu+branch:master">
    <img src="https://github.com/simonepri/osm-geojson/workflows/test-ubuntu/badge.svg?branch=master" alt="Test Ubuntu status" />
  </a>
  <!-- Test - Windows -->
  <a href="https://github.com/simonepri/osm-geojson/actions?query=workflow:test-windows+branch:master">
    <img src="https://github.com/simonepri/osm-geojson/workflows/test-windows/badge.svg?branch=master" alt="Test Windows status" />
  </a>

  <br/>

  <!-- Coverage - Codecov -->
  <a href="https://codecov.io/gh/simonepri/osm-geojson">
    <img src="https://img.shields.io/codecov/c/github/simonepri/osm-geojson/master.svg" alt="Codecov Coverage report" />
  </a>
  <!-- DM - Snyk -->
  <a href="https://snyk.io/test/github/simonepri/osm-geojson?targetFile=package.json">
    <img src="https://snyk.io/test/github/simonepri/osm-geojson/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" />
  </a>
  <!-- DM - David -->
  <a href="https://david-dm.org/simonepri/osm-geojson">
    <img src="https://david-dm.org/simonepri/osm-geojson/status.svg" alt="Dependency Status" />
  </a>

  <br/>

  <!-- Code Style - XO-Prettier -->
  <a href="https://github.com/xojs/xo">
    <img src="https://img.shields.io/badge/code_style-XO+Prettier-5ed9c7.svg" alt="XO Code Style used" />
  </a>
  <!-- Test Runner - AVA -->
  <a href="https://github.com/avajs/ava">
    <img src="https://img.shields.io/badge/test_runner-AVA-fb3170.svg" alt="AVA Test Runner used" />
  </a>
  <!-- Test Coverage - Istanbul -->
  <a href="https://github.com/istanbuljs/nyc">
    <img src="https://img.shields.io/badge/test_coverage-NYC-fec606.svg" alt="Istanbul Test Coverage used" />
  </a>
  <!-- Init - ni -->
  <a href="https://github.com/simonepri/ni">
    <img src="https://img.shields.io/badge/initialized_with-ni-e74c3c.svg" alt="NI Scaffolding System used" />
  </a>
  <!-- Release - np -->
  <a href="https://github.com/sindresorhus/np">
    <img src="https://img.shields.io/badge/released_with-np-6c8784.svg" alt="NP Release System used" />
  </a>
</p>
<p align="center">
  🔰 Get GeoJSON of a OpenStreetMap's relation from the API.
  <br/>

  <sub>
    Coded with ❤️ by <a href="#authors">Simone Primarosa</a>.
  </sub>
</p>

## Install

```
$ npm install --save osm-geojson
```

## Usage

```js
const osmGeoJson = require('osm-geojson');

osmGeoJson.get('365331'); // Italy
// => { type: 'GeometryCollection', geometries: [ { type: 'MultiPolygon', coordinates: [Array] } ] }

osmGeoJson.getAll({'ITA': '365331', 'USA': '148838'}); // Italy
// => {
// 'ITA': { type: 'GeometryCollection', geometries: [ { type: 'MultiPolygon', coordinates: [Array] } ] },
// 'USA': { type: 'GeometryCollection', geometries: [ { type: 'MultiPolygon', coordinates: [Array] } ] }
// }
```

## CLI

### Install
To use the CLI just install the package globally.
```
$ npm install --g osm-geojson
```
Or run it with `npx` if you are not planning to use it more than once.
```
$ npx osm-geojson
```

### Help
```bash
Usage
  $ osm-geojson <osmId>
  $ osm-geojson -l [<osmId>:<filename>]+
Options
  -l  --list [<osmId>:<filename>]+   To fetch a list of osmIds. Each relation
                                     will be saved in a file called
                                     filename.geojson
  -p --pretty                        To beautify the outputted JSON.
Examples
  $ osm-geojson 365331
  $ osm-geojson -p 365331
  $ osm-geojson -p 365331 > filename.geojson
  $ osm-geojson -l 365331:ita 148838:usa
```

## API

<a name="get"></a>

### get(osmid) ⇒ <code>Promise.&lt;object&gt;</code>
Returns the GeoJSON of a particular OSM relation id.

**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that contains the GeoJSON of the given
relation.

| Param | Type | Description |
| --- | --- | --- |
| osmid | <code>string</code> | Relation id from which extract the GeoJSON. |

<a name="getAll"></a>

### getAll(map) ⇒ <code>Promise.&lt;object&gt;</code>
Returns a map of GeoJSON of multiple OSM relation ids.

**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that contains the map with the same keys
of the map provided but with the GeoJSON of the given relation id as value.

| Param | Type | Description |
| --- | --- | --- |
| map | <code>object</code> | Map from a name to a relation id from which extract the GeoJSON. |

## Authors

- **Simone Primarosa** - *Github* ([@simonepri][github:simonepri]) • *Twitter* ([@simoneprimarosa][twitter:simoneprimarosa])

See also the list of [contributors][contributors] who participated in this project.

## License

This project is licensed under the MIT License - see the [license][license] file for details.


<!-- Links -->
[start]: https://github.com/simonepri/osm-geojson#start-of-content
[contributors]: https://github.com/simonepri/osm-geojson/contributors

[license]: https://github.com/simonepri/osm-geojson/tree/master/license

[github:simonepri]: https://github.com/simonepri
[twitter:simoneprimarosa]: http://twitter.com/intent/user?screen_name=simoneprimarosa
