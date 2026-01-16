export default async function handler(req, res) {
  const { category = "general", page = 1, pageSize = 5 } = req.query;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch news",
    });
  }
}
