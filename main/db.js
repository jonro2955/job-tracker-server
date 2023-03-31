const { Pool } = require("pg");

/* 
Connecting to psql shell in terminal:

$ sudo -i -u postgres

The terminal will ask for the sudo password. Upon entering it,
the prompt will change to:

postgres@pc-Precision-3510:~$

Next, enter “psql”:
postgres@pc-Precision-3510:~$ psql

Now the prompt will looks like this:
postgres=#

Connect to the “test” db using the "\c" command: 
postgres=# \c test

How to set the postgres password when in psql shell:
postgres=# ALTER USER postgres WITH PASSWORD '<newpassword>'; 
*/
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "jobtracker",
  password: "pc",
  post: 5432,
});

/* To output pool credential errors */
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
});



module.exports = pool;
