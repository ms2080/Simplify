const express = require("express");
const {
  handleGenerateNewShortURL,
  redirectTotheOrginalURL,
  viewVisitedHistory,
} = require("../controllers/url");
const router = express.Router();

//Route Handling
router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", redirectTotheOrginalURL);
router.get("/analytics/:shortId", viewVisitedHistory);

module.exports = router;
