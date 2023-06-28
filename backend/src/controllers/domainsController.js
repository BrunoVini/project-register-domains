const domainsModel = require("../models/domainsModel");

const getDomain = async (req, res) => {
  const userId = req.query.user;
  const domains = await domainsModel.getDomain(userId);

  if (domains.length === 0) {
    return res.status(404).json({ message: "Domain not found" });
  }

  return res.status(200).json(domains);
};

const getDomainById = async (req, res) => {
  const domainId = req.params.id;
  const domain = await domainsModel.getDomainById(domainId);

  if (domain.length === 0) {
    return res.status(404).json({ message: "Domain not found" });
  }

  return res.status(200).json(domain);
};

const postDomain = async (req, res) => {
  const createdDomains = await domainsModel.postDomain(req.body);

  if (createdDomains.error) {
    return res.status(404).json({ message: createdDomains.error });
  }

  return res.status(201).json(createdDomains);
};

const deleteDomain = async (req, res) => {
  const domainId = req.params.id;
  const domains = await domainsModel.deleteDomain(domainId);

  if (domains.length === 0) {
    return res.status(404).json({ message: "Domain not found" });
  }

  return res.status(202).json(domains);
};

module.exports = {
  getDomain,
  getDomainById,
  postDomain,
  deleteDomain,
};
