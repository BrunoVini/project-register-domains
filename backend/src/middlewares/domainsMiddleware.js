const db = require("../models/connection");

const validateBody = async (req, res, next) => {
  const { domain, subdomains, user_id } = req.body;

  if (domain === undefined || user_id === undefined) {
    let field = domain === undefined ? "Domain" : "user_id";
    return res.status(400).json({ message: `The field ${field} are required` });
  }

  if (domain === "" || user_id === "") {
    let field = domain === "" ? "Domain" : "user_id";
    return res
      .status(400)
      .json({ message: `The field ${field} cannot be empty` });
  }

  const [theresAnUser] = await db.connection.execute(
    `SELECT email FROM users WHERE id=${user_id}`
  );
  const [alredyTheresTheDomain] = await db.connection.execute(
    `SELECT main_domain FROM domains WHERE main_domain='${domain}' AND user_id=${user_id}`
  );

  if (theresAnUser.length === 0) {
    return res.status(404).json({ message: `This user does not exist` });
  }

  if (alredyTheresTheDomain != "") {
    return res
      .status(400)
      .json({ message: `This domain is already registered` });
  }

  next();
};

const validateGetDomain = async (req, res, next) => {
  const userId = req.query.user;

  if (userId === undefined || userId === "") {
    return res.status(400).json({ message: `The field user are required` });
  }

  next();
};

const validateDomainId = async (req, res, next) => {
  const domainId = req.params.id;

  if (domainId === undefined) {
    return res.status(400).json({ message: `The field domainId are required` });
  }

  if (domainId === "") {
    return res
      .status(400)
      .json({ message: `The field domainId cannot be empty` });
  }

  next();
};

const validateDeleteDomain = async (req, res, next) => {
  const domainId = req.params.id;

  if (domainId === undefined) {
    return res.status(400).json({ message: `The field id are required` });
  }

  if (domainId === "") {
    return res
      .status(400)
      .json({ message: `The field domainId cannot be empty` });
  }

  const [existTheDomainOfThisUser] = await db.connection.execute(
    `SELECT id FROM domains WHERE id='${domainId}'`
  );

  if (existTheDomainOfThisUser.length === 0) {
    return res.status(404).json({ message: `This domain does not exist` });
  }

  next();
};

module.exports = {
  validateBody,
  validateGetDomain,
  validateDomainId,
  validateDeleteDomain,
};
