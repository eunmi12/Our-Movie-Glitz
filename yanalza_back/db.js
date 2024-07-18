const db = {
    //디비연결
    database: "yanalza",
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    timezone: "GMT",
    charset: "utf8mb4",
  };
  const dbPool = require("mysql2").createPool(db);

  module.exports = dbPool;