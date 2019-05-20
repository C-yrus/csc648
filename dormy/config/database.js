// PostgreSQL database driver
// http://vitaly-t.github.io/pg-promise/index.html
const opts = {
    connect(client, dc, useCount) {
        const cp = client.connectionParameters;
        console.log(`Connection successful on DB: ${cp.database}`);
    }
};
const pgp = require('pg-promise')(opts);
const db = pgp(
    {
        user: 'csc648',
        host: 'dormydb.c07v9tfwathm.us-west-1.rds.amazonaws.com', // server name or IP address;
        port: 5432,
        database: 'dormyDB',
        user: 'csc648',
        password: 'password'
    }
);

module.exports = db;
