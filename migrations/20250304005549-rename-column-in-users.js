"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "gender", "accountType");
    await queryInterface.removeColumn("Users", "age");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "accountType", "gender");
    await queryInterface.addColumn("Users", "age", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
