import type { MetadataRoute } from "next";
import { brands, mainPages, services, SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    ...mainPages.map((page) => page.path),
    ...services.map((service) => `/uslugi/${service.slug}`),
    ...brands.map((brand) => `/marki/${brand.slug}`)
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.75
  }));
}
