const express = require("express");
const app = express();
const sequelize = require("./util/database");
const Users = require("./models/users");
const userRoutes = require("./routes/users");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(userRoutes);
sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.error(err));
