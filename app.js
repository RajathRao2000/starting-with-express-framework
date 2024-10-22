const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const contactusRouter = require("./routes/contact-us");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use("/shop", shopRouter);
app.use("/contact-us", contactusRouter);
app.use("/success", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "success.html"));
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use;
app.listen(3000);
