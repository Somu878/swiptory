const express = require("express");
require("dotenv").config();
const db = require("./utils/_db");
const app = express();
const PORT = process.env.PORT || 9000;
const authRouter = require("./routes/AuthRoute");
const cardRouter = require("./routes/cardRouter");
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/stories", cardRouter);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
