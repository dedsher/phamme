import DataTypes from 'sequelize';
const { sequelize } = require('../config/db');
const User = require('./User');
const Chat = require('./Chat');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sender_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    chat_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Chat,
            key: 'id',
        },
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
});

module.exports = Message;
