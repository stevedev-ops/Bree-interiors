# Bree Interiors - Portfolio Website & Admin Panel

A premium, modern portfolio website for a Kenyan interior designer brand called "Bree Interiors." The brand represents luxury Afro-Modern interiors that blend contemporary global design with authentic Kenyan heritage.

## 🌟 Brand Characteristics
- **Signature Style**: Savannah Minimalism™ (Refined modern interiors inspired by Kenyan landscapes, natural textures, and artisan craftsmanship).
- **Target Audience**: High-income homeowners in Nairobi, holiday home owners in Mombasa, Diaspora Kenyans building homes, and Airbnb/boutique hotel investors.
- **Color Palette**: Earthy Sand, Terracotta, Charcoal, Muted Olive, Warm White.

## 🛠 Tech Stack
- **Frontend**: React (Vite)
- **Styling**: Vanilla CSS (`index.css`)
- **Routing**: React Router (`react-router-dom`)
- **Backend & Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- A [Supabase](https://supabase.com/) account and project.

### Environment Setup
1. Clone the repository and navigate to the project directory:
   ```bash
   cd wbsite
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the project and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Running Locally
To start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the website in your browser.

## 📁 Project Structure

### Public Pages
- **Home** (`/`): Luxury editorial layout with a showcase of featured projects, the studio's story, and signature style.
- **About** (`/about`): The philosophy and inspiration behind Bree Interiors.
- **Portfolio** (`/portfolio`): Filterable grid of residential, commercial, and Airbnb styling projects.
- **The Design Journey** (`/journey`): A step-by-step breakdown of the premium client experience.
- **Services** (`/services`): Clear service tiers and a comprehensive FAQ section.
- **Sustainability** (`/sustainability`): Information on locally sourced materials and artisan collaborations.

### Admin Panel
- **Admin Login** (`/admin/login`): Secure entry point powered by Supabase Authentication.
- **Dashboard** (`/admin`): Overview of site traffic and quick links.
- **Content Management** (`/admin` tabs): Interfaces for updating Home page copy, hero images, and the projects portfolio.

## 🎨 Design & Development Notes
- The application implements a custom `useScrollReveal` hook to trigger `IntersectionObserver` based CSS transitions (`fade-in-up`, `.reveal` classes). 
- To maintain the "Savannah Minimalism™" aesthetic, no utility CSS frameworks like Tailwind were used. A global set of CSS variables controls the color tokens.
