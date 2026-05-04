require('dotenv').config();
const app = require('./app');
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;
console.log("HOST:", process.env.DB_HOST);
console.log("PORT:", process.env.DB_PORT);
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
})();