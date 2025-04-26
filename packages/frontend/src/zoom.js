document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const teamId = urlParams.get("id");

  if (!teamId) {
    alert("Team ID not found.");
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
        throw new Error("Could not load team data.");
      }
      const team = await res.json();

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
      console.error("Error loading team data:", error);
      alert("Error loading team data");
    }
  }

  loadTeamData();

  const exitButton = document.getElementById("exit");
  exitButton.addEventListener("click", () => {
    window.location.href = "/";
  });
});
