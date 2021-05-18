const User = require('./user');
const Portfolio = require('./portfolio');
const Project = require('./project');

Portfolio.hasMany(Project, {
  foreignKey: 'portfolio_id',
});

Project.belongsTo(Portfolio, {
  foreignKey: 'portfolio_id',
});

module.exports = { User, Portfolio, Project};