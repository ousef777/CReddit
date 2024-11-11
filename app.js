const express = require("express");

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

const routes = require("./routes");

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`The application is running on http://localhost:${PORT}`);
});