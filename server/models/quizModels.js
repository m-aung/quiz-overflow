const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.pgURI;

const pool = new Pool({
  connectionString: PG_URI,
  max: 3,
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
