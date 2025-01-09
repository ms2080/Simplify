const express = require("express");
const cors = require("cors");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const { connectToMongoDB } = require("./connect");
const app = express();

const PORT = 8001;

//Connection to database
connectToMongoDB("mongodb://localhost:27017/simplify").then(() =>
  console.log("MongoDB connected successfully!")
);

app.use(express.json());
app.use(cors());

app.use("/url", urlRoute);
app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));
