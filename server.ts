import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // SEO: Dynamic Sitemap
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = process.env.APP_URL || "https://unjeong-pyeonggang.com";
    const pages = ["", "intro", "treatments", "cases", "blog"];
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${baseUrl}/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`).join("")}
</urlset>`;
    
    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  // SEO: Dynamic RSS Feed
  app.get("/rss.xml", (req, res) => {
    const baseUrl = process.env.APP_URL || "https://unjeong-pyeonggang.com";
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
 <title>운정 평강한의원 소식</title>
 <description>파주 운정 평강한의원의 최신 진료 안내 및 건강 정보</description>
 <link>${baseUrl}</link>
 <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
 <item>
  <title>운정 평강한의원 홈페이지 오픈</title>
  <link>${baseUrl}</link>
  <description>더욱 편리한 예약과 정보 확인을 위해 홈페이지를 오픈하였습니다.</description>
  <pubDate>${new Date().toUTCString()}</pubDate>
 </item>
</channel>
</rss>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  // API Routes could go here

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
