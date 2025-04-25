const urlParams = new URLSearchParams(window.location.search);
const teamId = urlParams.get("id");

if (!teamId) {
  alert("ID de equipo no especificado");
  throw new Error("ID de equipo no encontrado en la URL");
}

const form = document.getElementById("add-team-form");

async function loadTeamData() {
  try {
    const res = await fetch(`/api/teams/${teamId}`);
    if (!res.ok) throw new Error("No se encontró el equipo");

    const team = await res.json();

    for (const key in team) {
      if (form[key]) {
        form[key].value = team[key];
      }
    }
  } catch (err) {
    console.error("Error al cargar datos del equipo:", err);
    alert("No se pudo cargar el equipo.");
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
      alert("Equipo actualizado con éxito");
      window.location.href = "/";
    } else {
      alert("Error al actualizar el equipo");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Ocurrió un error");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("exit-icon")) {
    window.location.href = "/";
  }
});

loadTeamData();
