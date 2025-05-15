// src/pages/Landing.jsx
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Plans from '../components/Plans';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Features />
      <Plans />
      <FAQ />
      <Footer />
    </div>
  );
}
