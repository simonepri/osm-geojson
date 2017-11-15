import test from 'ava';
import m from '.';

test('should return the geojson for a valid relation id', async t => {
  const geojson = await m.get('365331');
  t.is(typeof geojson, 'object');
  t.is(geojson.type, 'GeometryCollection');
});

test('should return an error for an invalid relation id', async t => {
  const error = await t.throws(m.get('XXX'), Error);
  t.is(error.message, 'Unable to get response for the relation: XXX');
});
