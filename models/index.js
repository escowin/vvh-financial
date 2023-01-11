// models
const User = require('./User')
const Client = require('./Client');
const Comment = require('./Comment');

// associations
// - 1:M | User:Comment
User.hasMany(Comment, {
    foreignKey: "user_id"
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});

// - 1:M | Client:Comment
Client.hasMany(Comment, {
    foreignKey: "client_id"
});

Comment.belongsTo(Client, {
    foreignKey: "client_id"
});

module.exports = { User, Client, Comment }