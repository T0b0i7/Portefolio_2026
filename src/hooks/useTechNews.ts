import { useState, useEffect } from "react";

export interface NewsItem {
  id: number;
  title: string;
  url?: string;
  time: number;
  score: number;
  by: string;
}

export function useTechNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      // Fetch top stories IDs
      const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const ids = await response.json();
      
      // Get the first 10 stories
      const top10Ids = ids.slice(0, 10);
      const stories = await Promise.all(
        top10Ids.map(async (id: number) => {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return res.json();
        })
      );
      
      setNews(stories.filter(Boolean));
    } catch (error) {
      console.error("Error fetching tech news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return { news, loading, refresh: fetchNews };
}
