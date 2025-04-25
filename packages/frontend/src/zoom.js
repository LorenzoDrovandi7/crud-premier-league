document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const teamId = urlParams.get("id");

  if (!teamId) {
    alert("No se encontró el ID del equipo.");
    return;
  }

  const teamDataElements = {
    name: document.getElementById("data-name"),
    shortName: document.getElementById("data-short-name"),
    tla: document.getElementById("data-tla"),
    address: document.getElementById("data-address"),
    phone: document.getElementById("data-phone"),
    website: document.getElementById("data-website"),
    email: document.getElementById("data-email"),
    founded: document.getElementById("data-founded"),
    clubColors: document.getElementById("data-clubColors"),
    venue: document.getElementById("data-venue"),
    logo: document.getElementById("team-logo"),
  };

  async function loadTeamData() {
    try {
      const res = await fetch(`/api/teams/${teamId}`);
      if (!res.ok) {
        throw new Error("No se pudo cargar los datos del equipo.");
      }
      const team = await res.json();

      // Asignamos los datos al DOM
      teamDataElements.name.textContent = team.name;
      teamDataElements.shortName.textContent = team.shortName;
      teamDataElements.tla.textContent = team.tla;
      teamDataElements.address.textContent = team.address;
      teamDataElements.phone.textContent = team.phone;
      teamDataElements.website.textContent = team.website;
      teamDataElements.email.textContent = team.email;
      teamDataElements.founded.textContent = team.founded;
      teamDataElements.clubColors.textContent = team.clubColors;
      teamDataElements.venue.textContent = team.venue;
      teamDataElements.logo.src = team.crestUrl; // Asignamos el logo
    } catch (error) {
      console.error("Error al cargar los datos del equipo:", error);
      alert("No se pudo cargar los datos del equipo.");
    }
  }

  loadTeamData();

  const exitButton = document.getElementById("exit");
  exitButton.addEventListener("click", () => {
    window.location.href = "/";
  });
});
