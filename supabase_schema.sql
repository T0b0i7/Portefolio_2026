-- SQL Schema for Portfolio.OS Supabase Migration

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  impact TEXT,
  metrics_type TEXT,
  color TEXT CHECK (color IN ('primary', 'secondary', 'accent', 'warning')),
  image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  project_url TEXT,
  status_fr TEXT,
  status_en TEXT,
  is_locked BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects
DROP POLICY IF EXISTS "Allow public read access" ON projects;
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

-- Allow authenticated users (admin) to manage projects
DROP POLICY IF EXISTS "Allow authenticated full access" ON projects;
CREATE POLICY "Allow authenticated full access" ON projects
  FOR ALL TO authenticated USING (true);

-- 2. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT false
);

-- Enable RLS for contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public to insert messages
DROP POLICY IF EXISTS "Allow public inserts" ON contact_messages;
CREATE POLICY "Allow public inserts" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read and manage messages
DROP POLICY IF EXISTS "Allow authenticated read and manage" ON contact_messages;
CREATE POLICY "Allow authenticated read and manage" ON contact_messages
  FOR ALL TO authenticated USING (true);

-- 3. Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  period TEXT NOT NULL,
  type TEXT CHECK (type IN ('work', 'education')),
  description_fr TEXT[] DEFAULT '{}',
  description_en TEXT[] DEFAULT '{}',
  status_fr TEXT, 
  status_en TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for experiences
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Allow public read access to experiences
DROP POLICY IF EXISTS "Allow public read access" ON experiences;
CREATE POLICY "Allow public read access" ON experiences
  FOR SELECT USING (true);

-- Allow authenticated users (admin) to manage experiences
DROP POLICY IF EXISTS "Allow authenticated full access" ON experiences;
CREATE POLICY "Allow authenticated full access" ON experiences
  FOR ALL TO authenticated USING (true);

-- 4. Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
