const db = require("./connection");
const { hash } = require("bcrypt");

const getAll = async () => {
  const [users] = await db.connection.execute(
    "SELECT id, name, email FROM `users`"
  );
  return users;
};

const validadeUser = async (user) => {
  const { email } = user;
  const [users] = await db.connection.execute(
    `SELECT id, name, email, password FROM users WHERE email = '${email}'`
  );

  return users;
};

const createUser = async (user) => {
  const { name, email, password } = user;
  const query = "INSERT INTO users(name, email, password) VALUES(?,?,?)";
  const hashedPassword = await hash(password, 10);

  const [createdUser] = await db.connection.execute(query, [
    name,
    email,
    hashedPassword,
  ]);

  return { insertId: createdUser.insertId };
};

module.exports = {
  getAll,
  validadeUser,
  createUser,
};
