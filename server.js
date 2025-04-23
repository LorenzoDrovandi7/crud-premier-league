const express = require("express");
const app = express();
const PORT = 8080;

const teamsRoutes = require("./packages/backend/src/routes/teams");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

app.use("/api/teams", teamsRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
