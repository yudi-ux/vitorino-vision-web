import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Catalog from "@/components/Catalog";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import HealthTips from "@/components/HealthTips";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Catalog />
        <Services />
        <Testimonials />
        <HealthTips />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
