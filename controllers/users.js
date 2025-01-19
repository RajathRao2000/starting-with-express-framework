const Users = require("../models/users");

const getAppointments = (req, res) => {
  Users.findAll()
    .then((result) => {
      res.json({ result, status: "success" });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        message: "error fetching users!!",
        status: "error",
      });
    });
};

const addAppointments = (req, res) => {
  Users.create({
    userName: req.body.userName,
    phone: req.body.phone,
    email: req.body.email,
  })
    .then((result) => {
      const data = {
        message: "successfully add new user!!",
        status: "success",
        id: result?.dataValues?.id,
      };
      res.status(200);
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      const data = {
        message: "error adding new user!!",
        status: "error",
      };
      res.status(500);
      res.json(data);
    });
};

const deleteAppointments = (req, res) => {
  Users.destroy({ where: { id: req.params.id } })
    .then((result) => {
      const data = {
        message: "successfully deleted user!!",
        status: "success",
      };
      res.status(200);
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      const data = {
        message: "error deleting user!!",
        status: "error",
      };
      res.status(500);
      res.json(data);
    });
};

module.exports = {
  getAppointments,
  addAppointments,
  deleteAppointments,
};
