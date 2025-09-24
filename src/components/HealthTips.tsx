import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Shield, Glasses, MessageCircle } from "lucide-react";

const HealthTips = () => {
  const tips = [
    {
      icon: <Glasses className="h-8 w-8 text-primary" />,
      title: "Como escolher a armação ideal para seu rosto",
      content: "A escolha da armação perfeita depende do formato do seu rosto. Rostos ovais combinam com quase todos os estilos, enquanto rostos quadrados ficam melhores com armações arredondadas. Rostos redondos harmonizam com armações angulares e geométricas.",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=250&fit=crop"
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "Diferença entre lentes comuns e lentes antirreflexo",
      content: "As lentes antirreflexo reduzem os reflexos indesejados, proporcionam maior nitidez visual e são esteticamente mais bonitas. São ideais para uso noturno, computador e atividades que exigem maior precisão visual.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Cuidados com óculos de sol falsificados",
      content: "Óculos de sol falsificados podem causar sérios danos aos seus olhos. Sempre verifique se possuem proteção UV adequada, certificação de qualidade e compre apenas em estabelecimentos confiáveis como a Ótica Vitorino.",
      image: "https://images.unsplash.com/photo-1556306535-38febf6782e7?w=400&h=250&fit=crop"
    }
  ];

  const handleWhatsApp = () => {
    const message = "Olá! Gostaria de mais informações sobre cuidados com a visão.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/558888888888?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Dicas de Cuidados com a Visão
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Informações importantes para manter sua saúde visual sempre em dia
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {tips.map((tip, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md">
              <div className="relative overflow-hidden">
                <img 
                  src={tip.image} 
                  alt={tip.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 mb-2">
                  {tip.icon}
                </div>
                <CardTitle className="text-lg text-foreground leading-tight">
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {tip.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleWhatsApp}
            variant="premium"
            size="lg"
            className="px-8 py-4 text-lg"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Tire suas dúvidas conosco
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HealthTips;