document.getElementById("add-team-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const teamData = Object.fromEntries(formData.entries());
  console.log(teamData);

  try {
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teamData),
    });

    if (res.ok) {
      alert("Team added successfully");
      window.location.href = "/";
    } else {
      alert("Error adding team");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while sending the data");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("exit-icon")) {
    window.location.href = "/";
  }
});
