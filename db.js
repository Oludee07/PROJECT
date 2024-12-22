const { Sequelize } = require("sequelize"); //import sequelize

const sequelize = new Sequelize("smthomedb", "postgres", "postgres", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

//this will initiate the connection to the database
(async () => {
    try {
      await sequelize.authenticate();
      console.log("connection has been established successfully");
    } catch (error) {
      console.error("unable to connect to database", error);
    }
  })();
  
  module.exports = sequelize;
  