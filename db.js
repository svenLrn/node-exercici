const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://postgres:6938@localhost:5432/planetsdb');

module.exports = db;
