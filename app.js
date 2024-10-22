const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRotes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { get404Page } = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRotes.routes);
app.use(shopRoutes);

app.use(get404Page);

app.listen(3000);
