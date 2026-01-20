export default async function handler(req, res) {
  const { category = "general", page = 1, pageSize = 8, q = "" } = req.query;

  try {
    let url = "";
    if (q.trim() !== "") {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`;
    } 
    else {
      url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    console.log("API KEY EXISTS:", !!process.env.NEWS_API_KEY);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch news",
    });
  }
}
