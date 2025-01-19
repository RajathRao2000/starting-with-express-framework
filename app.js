const express = require("express");
const app = express();
const sequelize = require("./util/database");
const expenseRoutes = require("./routes/expense");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(expenseRoutes);
sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.error(err));
