const Router = require("express");
const router = Router();

const usersController = require("./controllers/usersController");
const domainsController = require("./controllers/domainsController");

const domainsMiddleware = require("./middlewares/domainsMiddleware");
const usersMiddleware = require("./middlewares/usersMiddleware");

router.get(
  "/users",
  usersMiddleware.validateGetUser,
  usersController.validadeUser
);

router.post(
  "/users",
  usersMiddleware.validatePostUser,
  usersController.createUser
);

router.get(
  "/domains",
  domainsMiddleware.validateGetDomain,
  domainsController.getDomain
);

router.get(
  "/domain/:id",
  domainsMiddleware.validateDomainId,
  domainsController.getDomainById
);

router.post(
  "/domains",
  domainsMiddleware.validateBody,
  domainsController.postDomain
);

router.delete(
  "/domain/:id",
  domainsMiddleware.validateDeleteDomain,
  domainsController.deleteDomain
);

module.exports = router;
