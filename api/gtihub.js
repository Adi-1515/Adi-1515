export default async function handler(req, res) {
    const username = req.query.username;

    const query = {
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
    };

    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(query)
        });

        const data = await response.json();

        res.setHeader("Cache-Control", "s-maxage=3600");

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json({ error: "GraphQL error" });
    }
}
