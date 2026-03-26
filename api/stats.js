export default async function handler(req, res) {
    const username = req.query.username;

    const userRes = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
    });

    const user = await userRes.json();

    const contribRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
            query {
              user(login: "${username}") {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                  }
                }
              }
            }
            `
        })
    });

    const contribData = await contribRes.json();
    const contributions =
        contribData?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;

    const svg = `
    <svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
      <style>
        .text { fill: #ffffff; font-size: 14px; font-family: Arial; }
      </style>
      <rect width="100%" height="100%" fill="#0d1117"/>
      <text x="10" y="25" class="text">User: ${user.login}</text>
      <text x="10" y="50" class="text">Repos: ${user.public_repos}</text>
      <text x="10" y="75" class="text">Followers: ${user.followers}</text>
      <text x="10" y="100" class="text">Contributions: ${contributions}</text>
    </svg>
    `;

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "s-maxage=3600");

    res.status(200).send(svg);
}
