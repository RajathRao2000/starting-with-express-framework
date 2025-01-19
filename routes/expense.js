const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense");
router.get("/expense", expenseController.getExpenses);

router.post("/expense", expenseController.addExpenses);
router.put("/expense/:id", expenseController.putExpenses);

router.delete("/expense/:id", expenseController.deleteExpenses);

module.exports = router;
