import test from 'ava';
import execa from 'execa';
import fs from 'fs-extra';
import m from '.';

test('should return the geojson for a valid relation id', async t => {
  const geojson = await m.get('365331');
  t.is(typeof geojson, 'object');
  t.is(geojson.type, 'GeometryCollection');
});

test('should return a map of geojson for a valid map of relation ids', async t => {
  const map = {
    ITA: '365331',
    USA: '148838',
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
  const error = await t.throwsAsync(m.get('XXX'), Error);
  t.is(error.message, 'Unable to get response for the relation: XXX');
});

test('should print on stdout with a single osmid in the cli', async t => {
  const {stdout} = await execa('./cli.js', ['365331']);
  t.is(JSON.parse(stdout).type, 'GeometryCollection');
});

test('should create files using the list option in the cli', async t => {
  const filename = 'test_cli_ita';
  const path = `./${filename}.geojson`;

  let geojson;
  await fs.remove(path);

  await execa('./cli.js', ['-l', `365331:${filename}`]);
  t.is(await fs.pathExists(path), true);
  geojson = await fs.readJson(path);
  await fs.remove(path);
  t.is(geojson.type, 'GeometryCollection');

  await execa('./cli.js', ['--list', '-p', `365331:${filename}`]);
  t.is(await fs.pathExists(path), true);
  geojson = await fs.readJson(path);
  await fs.remove(path);
  t.is(geojson.type, 'GeometryCollection');
});

test('should print the help on stdout if the options provided are invalid in the cli', async t => {
  let result;
  result = await execa('./cli.js', []);
  t.regex(result.stdout, /Usage/);

  result = await execa('./cli.js', ['-h']);
  t.regex(result.stdout, /Usage/);

  result = await execa('./cli.js', ['--help']);
  t.regex(result.stdout, /Usage/);

  result = await execa('./cli.js', ['invalid']);
  t.regex(result.stdout, /Usage/);

  result = await execa('./cli.js', ['-l', `invalid:ita`]);
  t.regex(result.stdout, /Usage/);
});
