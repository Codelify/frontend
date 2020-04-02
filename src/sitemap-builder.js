require("babel-register")({
  presets: ["es2015", "react"]
});

const router = require("./utils/siteRouter").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .build("https://codelify.dev")
    .save("./sitemap.xml");
}

generateSitemap();
