const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const request = await fetch(
    "https://public-api.wordpress.com/wp/v2/sites/munyachiwundura.wordpress.com/posts"
  );
  const data = await request.json();
  const paths = data.map(
    (x) => `https://therealmunya.vercel.app/blogs/${x.id}`
  );

  const staticPages = [
    "https://overkilltodoapp.vercel.app/",
    "https://overkilltodoapp.vercel.app/analytics",
    "https://overkilltodoapp.vercel.app/calendar",
    "https://overkilltodoapp.vercel.app/profile",
  ];

  staticPages.push(...paths);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
