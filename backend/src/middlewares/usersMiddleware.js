const db = require("../models/connection");

const validatePostUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (name === undefined || email === undefined || password === undefined) {
    return res.status(400).json({
      message: `All the field name, email and passoword are required`,
    });
  }

  if (name === "" || email === "" || password === "") {
    return res.status(400).json({
      message: `All the field name, email and passoword cannot be empty`,
    });
  }

  const [theresAnUser] = await db.connection.execute(
    `SELECT email FROM users WHERE email='${email}'`
  );

  if (theresAnUser.length != 0) {
    return res.status(400).json({ message: `This user alredy exist` });
  }

  next();
};

const validateGetUser = async (req, res, next) => {
  const { email, password } = req.query;

  if (email === undefined || password === undefined) {
    return res.status(400).json({
      message: `All the field email and passoword are required`,
    });
  }

  if (email === "" || password === "") {
    return res.status(400).json({
      message: `All the field email and passoword cannot be empty`,
    });
  }

  next();
};

module.exports = {
  validatePostUser,
  validateGetUser,
};
