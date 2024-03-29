module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('Organization', {
      id: {
        type: DataTypes.INTEGER,
        // defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:false
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
