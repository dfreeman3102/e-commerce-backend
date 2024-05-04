const express = require('express');
const routes = require('./routes');
// imported sequelize connection
const sequelize = require("./config/connection.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// syncs sequelize models to the database, then turn on the express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
