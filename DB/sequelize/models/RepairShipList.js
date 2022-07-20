
const { DataTypes, Sequelize } = require('sequelize');

module.exports = class RepairShipList extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        RSName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
      },
      RSRegion: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
      },
      RSName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
      },
      RSNumber: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
      },
      RSAddress: {
        type: DataTypes.STRING(300),
        allowNull: true,
        unique: false,
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'RepairShipList',
      tableName: 'repairShipLists',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
};