import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, MessageCircle, Instagram, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    
    setFormData({ name: '', email: '', message: '' });
  };

  const handleWhatsApp = () => {
    const message = "Olá! Gostaria de mais informações sobre os serviços da Ótica Vitorino.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=558899048755&fbclid=PAZXh0bgNhZW0CMTEAAacPHZoHXRNxcV6X3ksZCw08u6a6kmbp22avhxGkEC_z4uzAeFMrYmA5xsbOIQ_aem_TB2C66pBA2YvlEl1v_6X4g&text=${encodedMessage}`, '_blank');
  };

  const handleConsultation = () => {
    const message = "Olá! Gostaria de agendar uma consulta na Ótica Vitorino.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=558899048755&fbclid=PAZXh0bgNhZW0CMTEAAacPHZoHXRNxcV6X3ksZCw08u6a6kmbp22avhxGkEC_z4uzAeFMrYmA5xsbOIQ_aem_TB2C66pBA2YvlEl1v_6X4g&text=${encodedMessage}`, '_blank');
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/oticavitorino.ipu/', '_blank');
  };

  return (
    <section id="contato" className="py-20 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Fale Conosco
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos prontos para atendê-lo. Entre em contato e agende sua consulta
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <MapPin className="h-6 w-6 text-primary" />
                  Nosso Endereço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  R. Padre Corrêa, 1197 - Centro<br />
                  Ipu - CE, 62250-000
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Clock className="h-6 w-6 text-primary" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Segunda a Sexta:</strong><br />
                  7h às 12h e 14h às 17h<br />
                  <strong>Sábado:</strong> Sob consulta<br />
                  <strong>Domingo:</strong> Fechado
                </p>
              </CardContent>
            </Card>

            {/* Contact Actions */}
            <div className="grid gap-4">
              <Button 
                onClick={handleConsultation}
                variant="premium"
                className="w-full font-medium py-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
                Agendar Consulta
              </Button>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Button 
                  onClick={handleWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </Button>
                
                <Button 
                  onClick={handleInstagram}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105"
                >
                  <Instagram className="h-5 w-5" />
                  Instagram
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-center">Envie uma Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="py-3 px-4 rounded-lg border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    placeholder="Seu e-mail"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Digite um endereço de email válido"
                    className="py-3 px-4 rounded-lg border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <Textarea
                    placeholder="Sua mensagem"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    rows={5}
                    className="py-3 px-4 rounded-lg border-border focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Google Maps */}
        <div className="mt-16">
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.123456789!2d-40.12345!3d-4.567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sR.%20Padre%20Corr%C3%AAa%2C%201197%20-%20Centro%2C%20Ipu%20-%20CE%2C%2062250-000!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Ótica Vitorino"
              ></iframe>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;