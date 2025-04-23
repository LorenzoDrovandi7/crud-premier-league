const express = require("express");
const router = express.Router();
let teams = require("../data/teamsData");

router.post("/", (req, res) => {
  const { name } = req.body;
  const newTeam = { id: Date.now(), name };
  teams.push(newTeam);
  res.status(201).json(newTeam);
});

router.get("/", (req, res) => {
  res.json(teams);
});

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

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = teams.findIndex((t) => t.id === id);
  if (index !== -1) {
    teams.splice(index, 1);
    res.status(204).send(); // No Content
  } else {
    res.status(404).json({ error: "Equipo no encontrado" });
  }
});

module.exports = router;
