const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res, next) => {
  res.send(
    `<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" method="POST" action="/login/group-chat">
    <input id="username" name="username"/>
    <button type="submit">Submit</button>
    </form>`
  );
});

router.use("/group-chat", (req, res, next) => {
  fs.readFile("messages.txt", (err, data) => {
    res.send(
      `<div>${data.toString()}</div>
        <form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST" action="/login/store-msg">
            <input id="message" name="message"/>
            <input id="username" type="hidden" name="username"/>
            <button type="submit">Send Message</button>
        </form>`
    );
  });
});

router.post("/store-msg", (req, res, next) => {
  console.log(req.body);
  fs.appendFile(
    "messages.txt",
    ` [n]${req.body.username}: [m]${req.body.message} `,
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
  res.redirect("/login/group-chat");
});

module.exports = router;
