# osm-geojson
[![Travis CI](https://travis-ci.org/simonepri/osm-geojson.svg?branch=master)](https://travis-ci.org/simonepri/osm-geojson) [![Codecov](https://img.shields.io/codecov/c/github/simonepri/osm-geojson/master.svg)](https://codecov.io/gh/simonepri/osm-geojson) [![npm](https://img.shields.io/npm/dm/osm-geojson.svg)](https://www.npmjs.com/package/osm-geojson) [![npm version](https://img.shields.io/npm/v/osm-geojson.svg)](https://www.npmjs.com/package/osm-geojson) [![npm dependencies](https://david-dm.org/simonepri/osm-geojson.svg)](https://david-dm.org/simonepri/osm-geojson) [![npm dev dependencies](https://david-dm.org/simonepri/osm-geojson/dev-status.svg)](https://david-dm.org/simonepri/osm-geojson#info=devDependencies)

> 🔰 Get GeoJSON of a OpenStreetMap's relation from the API.

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

## API

<a name="get"></a>

## get(osmid) ⇒ <code>Promise.&lt;object&gt;</code>
Returns the GeoJSON of a particular OSM relation id.

**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that contains the GeoJSON of the given
relation.  

| Param | Type | Description |
| --- | --- | --- |
| osmid | <code>string</code> | Relation id from which extract the GeoJSON. |

<a name="getAll"></a>

## getAll(map) ⇒ <code>Promise.&lt;object&gt;</code>
Returns a map of GeoJSON of multiple OSM relation ids.

**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that contains the map with the same keys
of the map provided but with the GeoJSON of the given relation id as value.  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>object</code> | Map from a name to a relation id from which extract the GeoJSON. |

## Authors
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/simonepri/osm-geojson/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
