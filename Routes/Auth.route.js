const express = require("express");
const router = express.Router();

//

router.post("/register", async (req, res, next) => {
  console.log(req.body);
  res.send("Register Route");
});

router.post("/login", async (req, res, next) => {
  res.send("Login Route");
});

router.post("/refresh-token", async (req, res, next) => {
  res.send("Refresh token Route");
});

router.delete("/logout", async (req, res, next) => {
  res.send("Logout Route");
});

module.exports = router;
