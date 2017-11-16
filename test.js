import test from 'ava';
import m from '.';

test('should return the geojson for a valid relation id', async t => {
  const geojson = await m.get('365331');
  t.is(typeof geojson, 'object');
  t.is(geojson.type, 'GeometryCollection');
});

test('should return a map of geojson for a valid map of relation ids', async t => {
  const map = {
    ITA: '365331',
    USA: '148838'
  };
  const geojsonMap = await m.getAll(map);

  t.is(typeof geojsonMap, 'object');

  t.is(typeof geojsonMap.ITA, 'object');
  t.is(typeof geojsonMap.USA, 'object');

  t.is(geojsonMap.ITA.type, 'GeometryCollection');
  t.is(geojsonMap.ITA.type, 'GeometryCollection');
});

test('should return an empty map with an empty map', async t => {
  const map = {};
  const geojsonMap = await m.getAll(map);

  t.is(typeof geojsonMap, 'object');

  t.is(Object.keys(geojsonMap).length, 0);
});

test('should return an error for an invalid relation id', async t => {
  const error = await t.throws(m.get('XXX'), Error);
  t.is(error.message, 'Unable to get response for the relation: XXX');
});
