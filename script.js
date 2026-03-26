fetch("/api/github?username=Adi-1515")
  .then(res => res.json())
  .then(data => {
    const contributions =
      data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;

    if (contributions === undefined) {
      document.getElementById("output").innerText = "Invalid API response";
      return;
    }

    document.getElementById("output").innerHTML = `
      Total Contributions: ${contributions}
    `;
  })
  .catch(() => {
    document.getElementById("output").innerText = "Fetch failed";
  });
