document.addEventListener("DOMContentLoaded", () => {
  const resultsDiv = document.getElementById("results");

  // Fetch all registrations
  document.getElementById("viewAll").addEventListener("click", async () => {
    const response = await fetch("/api/registrations");
    const data = await response.json();
    displayResults(data);
  });

  // Search  by name
  document.getElementById("searchByName").addEventListener("click", async () => {
    const name = document.getElementById("searchName").value;
    const response = await fetch(`/api/registrations/byname/${name}`);
    const data = await response.json();
    displayResults(data);
  });

  // Search  by event name
  document.getElementById("searchByEvent").addEventListener("click", async () => {
    const eventName = document.getElementById("searchEvent").value;
    const response = await fetch(`/api/registrations/event/${eventName}`);
    const data = await response.json();
    displayResults(data);
  });

  // delete ticket
  document
    .getElementById("cancelRegistration")
    .addEventListener("click", async () => {
      const ticketNumber = document.getElementById("ticketNumber").value;
      const response = await fetch(`/api/registrations/cancel/${ticketNumber}`);
      const data = await response.json();
      resultsDiv.innerHTML = data.message || data.error;
    });

  // results display
  function displayResults(data) {
    resultsDiv.innerHTML = ""; // Clear results
    if (!data || data.length === 0) {
      resultsDiv.innerHTML = "No records found.";
      return;
    }
    data.forEach((record) => {
      const div = document.createElement("div");
      div.textContent = `Name: ${record.name}, Email: ${record.email}, Date: ${record.date}, Event: ${record.eventName}, Ticket: ${record.ticketNumber}`;
      resultsDiv.appendChild(div);
    });
  }
});
