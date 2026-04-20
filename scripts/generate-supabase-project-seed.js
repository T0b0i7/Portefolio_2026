import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "projects_seed.json");
const outPath = path.join(root, "supabase", "seed_projects.sql");

const projects = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const esc = (value) => String(value ?? "").replace(/'/g, "''");
const arr = (value) =>
  Array.isArray(value) ? `ARRAY[${value.map((v) => `'${esc(v)}'`).join(",")}]::text[]` : "ARRAY[]::text[]";
const nullable = (value) => (value == null || value === "" ? "NULL" : `'${esc(value)}'`);
const bool = (value) => (value ? "true" : "false");

const lines = [
  "truncate table public.projects restart identity cascade;",
  ...projects.map((p) => {
    return `insert into public.projects (
id, title_fr, title_en, category, description_fr, description_en, tags, impact, metrics_type, color, image_url, gallery_urls, project_url, is_locked, is_featured, status_fr, status_en, sort_order, status, published_at
) values (
${Number(p.id)},
'${esc(p.title_fr)}',
'${esc(p.title_en)}',
'${esc(p.category)}',
'${esc(p.description_fr)}',
'${esc(p.description_en)}',
${arr(p.tags)},
${nullable(p.impact)},
${nullable(p.metrics_type)},
${nullable(p.color)},
${nullable(p.image_url)},
${arr(p.gallery_urls)},
${nullable(p.project_url)},
${bool(p.is_locked)},
${bool(p.is_featured)},
${nullable(p.status_fr)},
${nullable(p.status_en)},
${Number(p.id)},
'published',
now()
);`;
  }),
];

fs.writeFileSync(outPath, `${lines.join("\n\n")}\n`, "utf8");
console.log(`Seed SQL generated: ${outPath}`);

