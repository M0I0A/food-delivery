module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('Organization', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {});
  
    Organization.associate = (models) => {
      Organization.hasMany(models.Pricing, {
        foreignKey: 'organizationId',
        as: 'pricings',
      });
    };
  
    return Organization;
  };