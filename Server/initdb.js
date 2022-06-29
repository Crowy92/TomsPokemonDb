const { Pool } = require("pg");

const pool = new Pool({database: process.env.PG_DATABASE})

module.exports = pool