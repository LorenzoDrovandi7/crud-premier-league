const teamsDivs = [];
for (let i = 1; i <= 20; i++) {
  teamsDivs.push(document.getElementById(`team${i}`));
}

async function loadTeams() {
  const res = await fetch("/api/teams");
  const teams = await res.json();
  for (let i = 0; i < teamsDivs.length; i++) {
    if (i < teams.length) {
      teamsDivs[i].innerHTML = `<img src="${teams[i].crestUrl}" alt="${teams[i].name}"><img 
  src="images/zoom.png" 
  alt="Zoom ${teams[i].name}" 
  class="zoom-icon"
  data-team-id="${teams[i].id}" 
/>`;
    } else {
      teamsDivs[i].innerHTML = "";
    }
  }
}

loadTeams();
