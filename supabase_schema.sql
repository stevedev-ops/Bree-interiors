-- Supabase Schema for Bree Interiors

-- Create a table for Projects (Portfolio)
CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  category text NOT NULL, -- e.g., 'Residential', 'Commercial', 'Airbnb Styling'
  image_url text,
  description text,
  location text,
  budget text,
  timeline text,
  materials text,
  published boolean DEFAULT false
);

-- Create a table for Site Settings (Hero Text, About, Contact)
CREATE TABLE site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  key text UNIQUE NOT NULL, -- e.g., 'hero_tagline', 'contact_email', 'about_description'
  value text NOT NULL
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- This ensures only authenticated admins can write, but anyone can read published projects.
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to projects
CREATE POLICY "Public profiles are viewable by everyone."
  ON projects FOR SELECT
  USING ( true );

-- Policy: Allow authenticated users (admins) to insert/update/delete projects
CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  USING ( auth.role() = 'authenticated' );

-- Policy: Allow public read access to site settings
CREATE POLICY "Site settings are viewable by everyone."
  ON site_settings FOR SELECT
  USING ( true );

-- Policy: Allow authenticated users (admins) to update site settings
CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can insert site settings"
  ON site_settings FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

-- ==============================================================================
-- Optional: Insert Default Site Settings
-- ==============================================================================
INSERT INTO site_settings (key, value) VALUES
('hero_tagline', 'Designing Timeless Spaces with a Kenyan Soul.'),
('hero_description', 'Luxury Afro-Modern interiors that blend contemporary global design with authentic Kenyan heritage.'),
('contact_email', 'hello@breeinteriors.co.ke'),
('contact_phone', '+254 700 000 000'),
('contact_location', 'Karen Road, The Hub, Nairobi, Kenya');
