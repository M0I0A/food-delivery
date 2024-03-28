module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM('perishable', 'non-perishable'),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {});
  
    Item.associate = (models) => {
      Item.hasMany(models.Pricing, {
        foreignKey: 'itemId',
        as: 'pricings',
      });
    };
  
    return Item;
  };