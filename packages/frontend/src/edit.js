const urlParams = new URLSearchParams(window.location.search);
const teamId = urlParams.get("id");

if (!teamId) {
  alert("Team ID not specified");
  throw new Error("Team ID not found");
}

const form = document.getElementById("add-team-form");

async function loadTeamData() {
  try {
    const res = await fetch(`/api/teams/${teamId}`);
    if (!res.ok) throw new Error("Team not found");

    const team = await res.json();

    for (const key in team) {
      if (form[key]) {
        form[key].value = team[key];
      }
    }
  } catch (err) {
    console.error("Error loading team data:", err);
    alert("Error loading team data.");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const updatedTeam = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(`/api/teams/${teamId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTeam),
    });

    if (res.ok) {
      alert("Team successfully updated");
      window.location.href = "/";
    } else {
      alert("Error updating the team");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred while updating the team.");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("exit-icon")) {
    window.location.href = "/";
  }
});

loadTeamData();
