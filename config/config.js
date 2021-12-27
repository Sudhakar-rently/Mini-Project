require("dotenv").config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;


module.exports={
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "mini_project_development",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "mini_project_test",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "mini_project_production",
    "host": DB_HOST,
    "dialect": "postgres"
  }
}
