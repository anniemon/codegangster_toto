const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'admin',
    password: process.env.DATABASE_PASSWORD,
    database: 'todolist',
    host: 'codegangster-todolist.c4tretnl6cyc.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'todolist',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'todolist',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
