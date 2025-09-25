import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import glassesCollection from "@/assets/glasses-collection.jpg";

const Catalog = () => {
  const categories = [
    {
      title: "Óculos de Grau",
      description: "Armações modernas e confortáveis para uso diário",
      image: glassesCollection,
      whatsappMessage: "Olá! Gostaria de mais informações sobre óculos de grau."
    },
    {
      title: "Óculos de Sol",
      description: "Proteção UV com estilo e elegância",
      image: glassesCollection,
      whatsappMessage: "Olá! Gostaria de mais informações sobre óculos de sol."
    },
    {
      title: "Lentes",
      description: "Lentes de alta qualidade com tecnologia avançada",
      image: glassesCollection,
      whatsappMessage: "Olá! Gostaria de mais informações sobre lentes de óculos."
    },
    {
      title: "Armações",
      description: "Variedade de estilos para todos os gostos",
      image: glassesCollection,
      whatsappMessage: "Olá! Gostaria de mais informações sobre armações."
    },
    {
      title: "Relógios",
      description: "Coleção exclusiva de relógios elegantes",
      image: glassesCollection,
      whatsappMessage: "Olá! Gostaria de mais informações sobre relógios."
    }
  ];

  const handleWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/558888888888?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="catalogo" className="py-20 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nosso Catálogo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore nossa ampla variedade de produtos selecionados especialmente para você
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md">
              <div className="relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>
                <Button 
                  onClick={() => {
                    const categoryPath = category.title.toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace('óculos-', 'oculos-')
                      .replace('lentes-de-óculos', 'lentes')
                      .replace('lentes-', 'lentes');
                    window.location.href = `/categoria/${categoryPath}`;
                  }}
                  variant="premium"
                  className="w-full font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Conferir
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;