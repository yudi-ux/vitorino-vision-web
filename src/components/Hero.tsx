import { Button } from "@/components/ui/button";
import { Glasses } from "lucide-react";
import heroImage from "@/assets/hero-optica.jpg";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Ótica Vitorino - Loja moderna com armações de qualidade"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Ótica <span className="text-accent">Vitorino</span>
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
            Enxergue a vida com mais clareza
          </p>
          <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto">
            Há anos cuidando da sua visão com qualidade, confiança e atendimento personalizado em Ipu - CE
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('catalogo')}
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Conheça nossos produtos
            </Button>
            <Button 
              variant="premium" 
              size="lg"
              onClick={() => scrollToSection('contato')}
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Fale conosco
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="cursor-pointer" onClick={() => scrollToSection('catalogo')}>
          <Glasses className="w-8 h-8 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;