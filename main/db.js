const { Pool } = require("pg");

const pool = new Pool({
  user: "pc",
  host: "localhost",
  database: "jobtracker",
  password: "'",
  post: 5432,
});

module.exports = pool;
