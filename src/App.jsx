import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import DesignJourney from './pages/DesignJourney';
import Services from './pages/Services';
import Sustainability from './pages/Sustainability';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import Layout from './components/Layout';
import './App.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:id" element={<ProjectDetail />} />
          <Route path="journey" element={<DesignJourney />} />
          <Route path="services" element={<Services />} />
          <Route path="sustainability" element={<Sustainability />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin">
          <Route index element={<AdminDashboard />} />
          <Route path="login" element={<AdminLogin />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
