import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  // --- PROJECTS SEED ---
  if (fs.existsSync('./projects_seed.json')) {
    const projects = JSON.parse(fs.readFileSync('./projects_seed.json', 'utf8'));
    console.log(`Seeding ${projects.length} projects...`);
    for (const project of projects) {
      const { error } = await supabase.from('projects').upsert({
        id: project.id,
        title_fr: project.title_fr,
        title_en: project.title_en,
        category: project.category,
        description_fr: project.description_fr,
        description_en: project.description_en,
        tags: project.tags,
        impact: project.impact,
        metrics_type: project.metrics_type,
        color: project.color,
        image_url: project.image_url,
        gallery_urls: project.gallery_urls || [],
        project_url: project.project_url,
        status_fr: project.status_fr,
        status_en: project.status_en,
        is_locked: project.is_locked || false,
        is_featured: project.is_featured || false,
      });
      if (error) console.error(`Error seeding project ${project.id}:`, error.message);
      else console.log(`Project ${project.id} OK`);
    }
  }

  // --- EXPERIENCES SEED ---
  if (fs.existsSync('./experiences_seed.json')) {
    const experiences = JSON.parse(fs.readFileSync('./experiences_seed.json', 'utf8'));
    console.log(`Seeding ${experiences.length} experiences...`);
    for (const exp of experiences) {
      const { error } = await supabase.from('experiences').upsert({
        id: exp.id,
        title_fr: exp.title_fr,
        title_en: exp.title_en,
        company: exp.company || exp.company_fr,
        location: exp.location_fr,
        period: exp.period_fr,
        type: exp.type,
        description_fr: exp.description_fr,
        description_en: exp.description_en,
        status_fr: exp.status_fr,
        status_en: exp.status_en,
      });
      if (error) console.error(`Error seeding experience ${exp.id}:`, error.message);
      else console.log(`Experience ${exp.id} OK`);
    }
  }

  console.log('Seeding completed!');
}

seed().catch(console.error);
