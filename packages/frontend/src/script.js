const teamsDivs = [];
for (let i = 1; i <= 20; i++) {
  teamsDivs.push(document.getElementById(`team${i}`));
}

async function loadTeams() {
  const res = await fetch("/api/teams");
  const teams = await res.json();
  for (let i = 0; i < teamsDivs.length; i++) {
    if (i < teams.length) {
      teamsDivs[i].innerHTML = `
        <img src="${teams[i].crestUrl}" alt="${teams[i].name}" class="team-logo"/>
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

    const confirmed = confirm("¿Seguro que querés eliminar este equipo?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/teams/${teamId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Equipo eliminado con éxito");
        loadTeams();
      } else {
        alert("Error al eliminar el equipo");
      }
    } catch (error) {
      console.error("Error eliminando el equipo:", error);
      alert("Ocurrió un error");
    }
  }
});
