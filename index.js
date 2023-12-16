const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies

require("./models"); // DB connection
require("./controllers/index")(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
