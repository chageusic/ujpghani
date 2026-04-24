import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProd = process.env.NODE_ENV === "production";

  console.log(`[ClinicServer] Attempting to start in ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

  // 1. Health check (Highest priority)
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "alive", mode: isProd ? 'production' : 'development' });
  });

  // 2. SEO routes
  app.get("/sitemap.xml", (req, res) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://unjeong-pyeonggang.com/</loc><priority>1.0</priority></url></urlset>`;
    res.header("Content-Type", "application/xml").send(xml);
  });

  // 3. Application Serving
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ClinicServer] Success! Listening on port ${PORT}`);
  });
}

startServer().catch(console.error);
