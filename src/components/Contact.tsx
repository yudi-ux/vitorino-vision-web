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
    window.open(`https://wa.me/558888888888?text=${encodedMessage}`, '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/oticavitorino', '_blank');
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

        {/* Map Placeholder */}
        <div className="mt-16">
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="h-64 bg-gradient-to-r from-primary/20 to-primary-light/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  Localização: Centro de Ipu - CE
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;