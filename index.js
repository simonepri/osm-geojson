'use strict';

const request = require('request');
const pify = require('pify');
const wait = require('wait-then');
const rand = require('random-int');

const API_GET_GEO = 'http://polygons.openstreetmap.fr/get_geojson.py?params=0&id=';

let last = null;

/**
 * Returns the GeoJSON of a particular OSM relation id.
 * @public
 * @param  {string} osmid Relation id from which extract the GeoJSON.
 * @return {Promise<object>} A promise that contains the GeoJSON of the given
 * relation.
 */
function getGeoJson(osmid) {
  const opts = {
    url: API_GET_GEO + osmid
  };

  if (last === null) {
    last = Date.now();
  }

  // We don't want to flood the API.
  let delta = 50 - (Date.now() - last) + rand(50);
  if (delta < 0) {
    delta = 0;
  }

  return new Promise((resolve, reject) => {
    wait(delta)
      .then(() => {
        last = Date.now();
        return pify(request)(opts);
      })
      .then(response => {
        if (!response || !response.body || response.body.substr(0, 4) === 'None' || response.statusCode === 500) {
          reject(new Error('Unable to get response for the relation: ' + osmid));
          return;
        }
        if (response.statusCode !== 200) {
          getGeoJson(osmid)
            .then(resolve)
            .catch(reject);
          return;
        }
        try {
          const geojson = JSON.parse(response.body);
          resolve(geojson);
        } catch (err) {
          getGeoJson(osmid)
            .then(resolve)
            .catch(reject);
        }
      })
      .catch(() => {
        getGeoJson(osmid)
          .then(resolve)
          .catch(reject);
      });
  });
}
/**
 * Returns a map of GeoJSON of multiple OSM relation ids.
 * @public
 * @param  {object} map Map from a name to a relation id from which extract the GeoJSON.
 * @return {Promise<object>} A promise that contains the map with the same keys
 * of the map provided but with the GeoJSON of the given relation id as value.
 */
function getAllGeoJson(map) {
  const promises = [];
  const geojsonMap = {};

  for (const country of Object.keys(map)) {
    promises.push(
      new Promise((resolve, reject) => {
        getGeoJson(map[country])
          .then(geoJson => {
            geojsonMap[country] = geoJson;
            resolve();
          })
          .catch(reject);
      })
    );
  }

  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then(() => {
        resolve(geojsonMap);
      })
      .catch(reject);
  });
}

module.exports = {
  get: getGeoJson,
  getAll: getAllGeoJson
};
