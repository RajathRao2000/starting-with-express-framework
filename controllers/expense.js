const Expense = require("../models/expenses");

const getExpenses = (req, res) => {
  Expense.findAll()
    .then((result) => {
      res.json({ result, status: "success" });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        message: "error fetching expenses!!",
        status: "error",
      });
    });
};

const addExpenses = (req, res) => {
  Expense.create({
    amount: req.body.amount || 0,
    description: req.body.description || "",
    category: req.body.category || "",
  })
    .then((result) => {
      const data = {
        message: "successfully add new expense!!",
        status: "success",
        id: result?.dataValues?.id,
      };
      res.status(200);
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      const data = {
        message: "error adding new expense!!",
        status: "error",
      };
      res.status(500);
      res.json(data);
    });
};

const deleteExpenses = (req, res) => {
  Expense.destroy({ where: { id: req.params.id } })
    .then((result) => {
      const data = {
        message: "successfully deleted expense!!",
        status: "success",
      };
      res.status(200);
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      const data = {
        message: "error deleting expense!!",
        status: "error",
      };
      res.status(500);
      res.json(data);
    });
};

const putExpenses = (req, res) => {
  Expense.update(
    {
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category,
    },
    { where: { id: req.params.id } }
  )
    .then((result) => {
      const data = {
        message: "successfully updated expense!!",
        status: "success",
      };
      res.status(200);
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      const data = {
        message: "error updating expense!!",
        status: "error",
      };
      res.status(500);
      res.json(data);
    });
};

module.exports = {
  putExpenses,
  getExpenses,
  addExpenses,
  deleteExpenses,
};
