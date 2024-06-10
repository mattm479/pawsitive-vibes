const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: DataTypes.ENUM('Active', 'Inactive'),
            allowNull: false,
            defaultValue: 'Active'
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: false,
        modelName: 'post'
    }
);

module.exports = Post;