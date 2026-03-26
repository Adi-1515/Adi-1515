export default async function handler(req, res) {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: "No username" });
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.setHeader("Cache-Control", "s-maxage=3600");

        return res.status(200).json(data);

    } catch {
        return res.status(500).json({ error: "Server error" });
    }
}
