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
      alert("Equipo agregado con éxito");
      window.location.href = "/";
    } else {
      alert("Error al agregar equipo");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error al enviar los datos");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("exit-icon")) {
    window.location.href = "/";
  }
});
