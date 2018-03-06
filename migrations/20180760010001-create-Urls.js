
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Urls', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    shorturl: {
      unique: true,
      allowNull: false,
      type: Sequelize.STRING,
    },
    longurl: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Urls'),
};
