const db = require("./connection");
const axios = require("axios");
require("dotenv").config();

const getDomain = async (id) => {
  const [domains] = await db.connection.execute(
    `SELECT * FROM domains WHERE user_id = '${id}'`
  );
  return domains;
};

const getDomainById = async (domainId) => {
  const [domains] = await db.connection.execute(
    `SELECT * FROM domains WHERE id = '${domainId}'`
  );
  return domains;
};

const postDomain = async (domainPost) => {
  const { domain, user_id } = domainPost;
  const dateUTC = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const apiKey = process.env.SUBDOMAINS_API_KEY;
    const apiUrl = `https://subdomains.whoisxmlapi.com/api/v1?apiKey=${apiKey}&domainName=${domain}`;

    try {
      const response = await axios.get(apiUrl);
      const { result } = response.data;
      const urls = result.records;

      if (urls.length === 0) {
        return { error: "Subdomain not found" };
      } else if (urls.code === 422) {
        return { error: "Invalid URL" };
      } else {
        const subdomains = urls.map((item) => item.domain);
        const uuid = db.generateUUID();
        const subdomainsJSON = JSON.stringify(subdomains);

        const [createdDomains] = await db.connection.execute(
          `INSERT INTO domains(id, user_id, main_domain, subdomains, update_at) VALUES ('${uuid}', '${user_id}', '${domain}', '${subdomainsJSON}'  , '${dateUTC}')`
        );

        return { insertId: createdDomains.insertId };
      }
    } catch (error) {
      console.error(error);
      return { error: "Invalid URL" };
    }
  } catch (error) {
    console.error("Error fetching subdomains");
    throw error;
  }
};

const deleteDomain = async (domainId) => {
  const [deletedDomain] = await db.connection.execute(
    `DELETE FROM domains WHERE id = '${domainId}'`
  );
  return { insertId: deletedDomain.insertId };
};

module.exports = {
  getDomain,
  getDomainById,
  postDomain,
  deleteDomain,
};
