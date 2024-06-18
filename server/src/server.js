const app = require('./app');
const port = process.env.DB_PORT || 5000;

const { sequelize } = require('./config/db');

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});