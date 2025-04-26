const teamsDivs = [];
for (let i = 1; i <= 20; i++) {
  teamsDivs.push(document.getElementById(`team${i}`));
}

async function loadTeams() {
  const res = await fetch("/api/teams");
  const teams = await res.json();
  for (let i = 0; i < teamsDivs.length; i++) {
    if (i < teams.length) {
      const logoUrl = teams[i].crestUrl || "images/plus.png";
      teamsDivs[i].innerHTML = `
        <img src="${logoUrl}" alt="${teams[i].name}" class="team-logo"/>
          <div class="team-controllers">
          <img src="images/zoom.png" class="zoom-icon" data-team-zoom-id="${teams[i].id}"/>
          <img src="images/edit.png" class="edit-icon" data-team-edit-id="${teams[i].id}"/>
          <img src="images/delete.png" class="delete-icon" data-team-delete-id="${teams[i].id}"/>
        </div>`;
    } else {
      teamsDivs[i].innerHTML = `
        <img src="images/plus.png" class="add-icon" alt="Agregar equipo" data-add-team-id="${i + 1}"/>`;
    }
  }
}

loadTeams();

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-icon")) {
    const teamId = e.target.dataset.teamDeleteId;

    const confirmed = confirm("Are you sure you want to delete this team?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/teams/${teamId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Team successfully eliminated");
        loadTeams();
      } else {
        alert("Error deleting the team");
      }
    } catch (error) {
      console.error("Error deleting equipment:", error);
      alert("An error occurred");
    }
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-icon")) {
    window.location.href = "/add.html";
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-icon")) {
    const teamId = e.target.dataset.teamEditId;
    window.location.href = `/edit.html?id=${teamId}`;
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("zoom-icon")) {
    const teamId = e.target.dataset.teamZoomId;
    window.location.href = `/zoom.html?id=${teamId}`;
  }
});
