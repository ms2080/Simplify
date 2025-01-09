const shortid = require("shortid");
const URL = require("../models/url");

//Method for POST request that is entering the url in the database
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required." });

  //Checking that URL if it already is present in the database.
  const output = await URL.findOne({
    redirectURL: body.url,
  });
  if (!output) {
    const shortID = shortid();
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.json({ id: shortID });
  } else {
    res.json({ id: output.shortId });
  }

  return;
}

//Function to update the visited count variable if the URL is visited.

async function redirectTotheOrginalURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);
}

//Function to get the analytics and details of a URL.

async function viewVisitedHistory(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({
    shortId,
  });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  redirectTotheOrginalURL,
  viewVisitedHistory,
};
