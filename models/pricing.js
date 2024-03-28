module.exports = (sequelize, DataTypes) => {
    const Pricing = sequelize.define('Pricing', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      organizationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Organizations',
          key: 'id',
        },
      },
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Items',
          key: 'id',
        },
      },
      zone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      baseDistanceInKm: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kmPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      fixPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {});
  
    Pricing.associate = (models) => {
      Pricing.belongsTo(models.Organization, {
        foreignKey: 'organizationId',
        as: 'organization',
      });
      Pricing.belongsTo(models.Item, {
        foreignKey: 'itemId',
        as: 'item',
      });
    };
  
    return Pricing;
  };