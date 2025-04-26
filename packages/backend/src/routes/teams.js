const express = require("express");
const router = express.Router();
let teams = require("../data/teamsData");

router.post("/", (req, res) => {
  const { name, shortName, tla, crestUrl, address, phone, website, email, founded, clubColors, venue } = req.body;

  if (!name || !crestUrl) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  const newTeam = {
    id: Date.now(),
    name,
    shortName: shortName || "",
    tla: tla || "",
    crestUrl,
    address: address || "",
    phone: phone || "",
    website: website || "",
    email: email || "",
    founded: founded || "",
    clubColors: clubColors || "",
    venue: venue || "",
  };

  teams.push(newTeam);
  res.status(201).json(newTeam);
});

router.get("/", (req, res) => {
  res.json(teams);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, crestUrl } = req.body;

  const team = teams.find((t) => t.id == id);
  if (team) {
    if (name) team.name = name;
    if (crestUrl) team.crestUrl = crestUrl;
    res.json(team);
  } else {
    res.status(404).json({ error: "Team not found" });
  }
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = teams.findIndex((t) => t.id === id);

  if (index !== -1) {
    teams.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Team not found." });
  }
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const team = teams.find((t) => t.id === id);

  if (team) {
    res.json(team);
  } else {
    res.status(404).json({ error: "Team not found" });
  }
});

module.exports = router;
