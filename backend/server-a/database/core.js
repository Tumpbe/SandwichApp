const { Client } = require('pg');

// TODO: Use environment variables
const client = new Client({
  host: 'database',
  database: 'postgres',
  user: 'postgres',
  password: 'postgres',
  port: 5432,
});
client.connect();
module.exports.client = client;

module.exports.query = (query, args) => new Promise((resolve, reject) => {
  client.query(query, args, (err, res) => {
    if (err) {
      reject(err);
    }
    else {
      resolve(res ? res.rows : []);
    }
  });
});
