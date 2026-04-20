import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'home.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS home (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    location  TEXT    NOT NULL,
    latitude  REAL    NOT NULL,
    longitude REAL    NOT NULL,
    elevation REAL    NOT NULL,
    sunrise   TEXT    NOT NULL,
    sunset    TEXT    NOT NULL,
    date      TEXT    NOT NULL
  )
`);

const insert = db.prepare(`
  INSERT INTO home (location, latitude, longitude, elevation, sunrise, sunset, date)
  VALUES (@location, @latitude, @longitude, @elevation, @sunrise, @sunset, @date)
`);

const rows = [
  {
    location: 'Mount Shasta, CA',
    latitude: 41.4099,
    longitude: -122.1949,
    elevation: 4322,
    sunrise: '06:12',
    sunset: '19:47',
    date: '2026-04-20',
  },
  {
    location: 'Rocky Mountain NP, CO',
    latitude: 40.3428,
    longitude: -105.6836,
    elevation: 3395,
    sunrise: '06:21',
    sunset: '19:54',
    date: '2026-04-19',
  },
  {
    location: 'Glacier Peak, WA',
    latitude: 48.1123,
    longitude: -121.1138,
    elevation: 3213,
    sunrise: '05:58',
    sunset: '20:12',
    date: '2026-04-18',
  },
  {
    location: 'Grand Teton, WY',
    latitude: 43.7412,
    longitude: -110.8024,
    elevation: 4197,
    sunrise: '06:31',
    sunset: '20:01',
    date: '2026-04-17',
  },
];

const insertMany = db.transaction((entries: typeof rows) => {
  for (const row of entries) insert.run(row);
});

insertMany(rows);
db.close();

console.log(`Seeded ${rows.length} rows into ${dbPath}`);
