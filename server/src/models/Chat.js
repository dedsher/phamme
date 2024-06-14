const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Chat = sequelize.define('Chat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    chat_name: {
        type: DataTypes.STRING,
    },
    is_group_chat: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Chat;
