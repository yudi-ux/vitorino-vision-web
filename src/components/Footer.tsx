import { Eye, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    const message = "Olá! Gostaria de mais informações sobre os serviços da Ótica Vitorino.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=558899048755&fbclid=PAZXh0bgNhZW0CMTEAAacPHZoHXRNxcV6X3ksZCw08u6a6kmbp22avhxGkEC_z4uzAeFMrYmA5xsbOIQ_aem_TB2C66pBA2YvlEl1v_6X4g&text=${encodedMessage}`, '_blank');
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/oticavitorino.ipu/', '_blank');
  };

  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold">Ótica Vitorino</span>
            </div>
            <p className="text-white/80 leading-relaxed max-w-md">
              Há anos cuidando da sua visão com qualidade, confiança e 
              atendimento personalizado em Ipu - CE. Sua saúde visual é 
              nossa prioridade.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <button 
                onClick={handleWhatsApp}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors duration-300"
                aria-label="WhatsApp da Ótica Vitorino"
              >
                <MessageCircle className="h-5 w-5" />
              </button>
              <button 
                onClick={handleInstagram}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors duration-300"
                aria-label="Instagram da Ótica Vitorino"
              >
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('inicio')}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('sobre')}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('catalogo')}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Catálogo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('servicos')}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contato')}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contato</h3>
            <div className="space-y-3 text-white/80">
              <p>
                R. Padre Corrêa, 1197<br />
                Centro, Ipu - CE<br />
                62250-000
              </p>
              <p>
                <strong>Horário:</strong><br />
                7h às 12h e 14h às 17h
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60">
              © 2025 Ótica Vitorino – Todos os direitos reservados.
            </p>
            <button 
              onClick={() => window.location.href = '/terms'}
              className="text-white/60 hover:text-white transition-colors duration-300 underline"
            >
              Direitos Autorais e Termos de Uso
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;