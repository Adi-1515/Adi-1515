Promise.all([
  fetch("/api/github?username=Adi-1515").then(res => res.json()),
  fetch("/api/contributions?username=Adi-1515").then(res => res.json())
])
.then(([user, contrib]) => {

  if (user.message) {
    document.getElementById("output").innerText = user.message;
    return;
  }

  const contributions =
    contrib?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;

  document.getElementById("output").innerHTML = `
    Name: ${user.name || user.login} <br>
    Public Repos: ${user.public_repos} <br>
    Followers: ${user.followers} <br>
    Contributions: ${contributions}
  `;
})
.catch(() => {
  document.getElementById("output").innerText = "Fetch failed";
});
