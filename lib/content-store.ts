import "server-only";

import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { defaultSiteContent } from "@/lib/default-site-content";
import { getDatabasePath } from "@/lib/storage-paths";
import type { SiteContent } from "@/types/site-content";

const CONTENT_KEY = "site-content";

let db: Database.Database | null = null;

function openDb() {
  if (db) {
    return db;
  }

  const dbPath = getDatabasePath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS content_store (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  return db;
}

function normalizeContent(content: SiteContent): SiteContent {
  const fallbackPhone = {
    label: content.contact?.phone || defaultSiteContent.contact.phone,
    href: content.contact?.phoneHref || defaultSiteContent.contact.phoneHref,
    visible: true
  };
  const phones = (content.contact?.phones?.length ? content.contact.phones : [fallbackPhone])
    .map((phone) => ({
      label: phone.label || fallbackPhone.label,
      href: phone.href || fallbackPhone.href,
      visible: phone.visible !== false
    }));

  return {
    ...defaultSiteContent,
    ...content,
    header: { ...defaultSiteContent.header, ...content.header },
    contact: { ...defaultSiteContent.contact, ...content.contact, phones },
    home: { ...defaultSiteContent.home, ...content.home },
    insurance: { ...defaultSiteContent.insurance, ...content.insurance },
    calculator: {
      ...defaultSiteContent.calculator,
      ...content.calculator,
      toggles: (content.calculator?.toggles?.length ? content.calculator.toggles : defaultSiteContent.calculator.toggles).map((toggle) => ({
        ...toggle,
        amountType: toggle.amountType === "percent" ? "percent" : "fixed"
      }))
    },
    reviews: { ...defaultSiteContent.reviews, ...content.reviews },
    footer: { ...defaultSiteContent.footer, ...content.footer },
    pages: {
      services: {
        ...defaultSiteContent.pages.services,
        ...content.pages?.services,
        seo: { ...defaultSiteContent.pages.services.seo, ...content.pages?.services?.seo },
        hero: { ...defaultSiteContent.pages.services.hero, ...content.pages?.services?.hero },
        items: content.pages?.services?.items?.length ? content.pages.services.items : defaultSiteContent.pages.services.items
      },
      brands: {
        ...defaultSiteContent.pages.brands,
        ...content.pages?.brands,
        seo: { ...defaultSiteContent.pages.brands.seo, ...content.pages?.brands?.seo },
        hero: { ...defaultSiteContent.pages.brands.hero, ...content.pages?.brands?.hero },
        items: content.pages?.brands?.items?.length ? content.pages.brands.items : defaultSiteContent.pages.brands.items
      },
      commercial: {
        ...defaultSiteContent.pages.commercial,
        ...content.pages?.commercial,
        seo: { ...defaultSiteContent.pages.commercial.seo, ...content.pages?.commercial?.seo },
        hero: { ...defaultSiteContent.pages.commercial.hero, ...content.pages?.commercial?.hero },
        cards: content.pages?.commercial?.cards?.length ? content.pages.commercial.cards : defaultSiteContent.pages.commercial.cards
      },
      works: {
        ...defaultSiteContent.pages.works,
        ...content.pages?.works,
        seo: { ...defaultSiteContent.pages.works.seo, ...content.pages?.works?.seo },
        hero: { ...defaultSiteContent.pages.works.hero, ...content.pages?.works?.hero },
        cards: content.pages?.works?.cards?.length ? content.pages.works.cards : defaultSiteContent.pages.works.cards
      }
    },
    interface: { ...defaultSiteContent.interface, ...content.interface }
  };
}

export function getSiteContent(): SiteContent {
  const row = openDb()
    .prepare("SELECT value FROM content_store WHERE key = ?")
    .get(CONTENT_KEY) as { value: string } | undefined;

  if (!row) {
    saveSiteContent(defaultSiteContent);
    return defaultSiteContent;
  }

  try {
    return normalizeContent(JSON.parse(row.value) as SiteContent);
  } catch {
    return defaultSiteContent;
  }
}

export function saveSiteContent(content: SiteContent) {
  const normalized = normalizeContent(content);
  openDb()
    .prepare(
      `INSERT INTO content_store (key, value, updated_at)
       VALUES (?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
    )
    .run(CONTENT_KEY, JSON.stringify(normalized), new Date().toISOString());
  return normalized;
}
