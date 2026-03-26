fetch("/api/github?username=Adi-1515")
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      document.getElementById("output").innerText = data.error;
      return;
    }

    document.getElementById("output").innerHTML = `
      Name: ${data.name || "N/A"} <br>
      Public Repos: ${data.public_repos} <br>
      Followers: ${data.followers}
    `;
  })
  .catch(() => {
    document.getElementById("output").innerText = "Fetch failed";
  });
