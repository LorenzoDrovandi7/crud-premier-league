const express = require("express");
const router = express.Router();
let teams = require("../data/teams");

// CREATE
router.post("/", (req, res) => {
  const { name } = req.body;
  const newTeam = { id: Date.now(), name };
  teams.push(newTeam);
  res.status(201).json(newTeam);
});

// READ
router.get("/", (req, res) => {
  res.json(teams);
});

// UPDATE
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const team = teams.find((t) => t.id == id);
  if (team) {
    team.name = name;
    res.json(team);
  } else {
    res.status(404).json({ error: "Team not found" });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  teams = teams.filter((t) => t.id != id);
  res.json({ message: "Team deleted" });
});

module.exports = router;
