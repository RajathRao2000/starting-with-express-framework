exports.getContacts = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact-us.html"));
};

exports.redirect = (req, res, next) => {
  res.redirect("/success");
};
