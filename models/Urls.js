
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('Urls', {
    shorturl: {
      unique: true,
      type: DataTypes.STRING,
      validate: { len: [6, 6] },
    },
    longurl: DataTypes.STRING,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return users;
};
