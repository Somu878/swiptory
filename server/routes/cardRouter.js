const express = require("express");

const cardRouter = express.Router();
const tokenVerification = require("../middlewares/verifyToken");

cardRouter.get("/test", tokenVerification, (req, res) => {
  res.json({
    id: req.userID,
    name: req.userName,
  });
});

module.exports = cardRouter;
