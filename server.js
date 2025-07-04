const express = require("express");
const app = express();
const PORT = 8080;

const teamsRoutes = require("./packages/backend/src/routes/teams.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("packages/frontend"));

app.use("/api/teams", teamsRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
