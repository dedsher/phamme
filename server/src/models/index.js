const User = require('./User');
const Chat = require('./Chat');
const Message = require('./Message');
const Transaction = require('./Transaction');

User.hasMany(Message, { foreignKey: 'sender_id' });
Message.belongsTo(User, { foreignKey: 'sender_id' });

Chat.hasMany(Message, { foreignKey: 'chat_id' });
Message.belongsTo(Chat, { foreignKey: 'chat_id' });

User.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

const ChatUser = sequelize.define('ChatUser', {}, { timestamps: false });

Chat.belongsToMany(User, { through: ChatUser });
User.belongsToMany(Chat, { through: ChatUser });

module.exports = { User, Chat, Message, Transaction, ChatUser };
