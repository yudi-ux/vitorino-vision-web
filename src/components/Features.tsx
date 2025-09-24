import { Card, CardContent } from "@/components/ui/card";
import { Eye, Award, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Atendimento Especializado",
      description: "Nossa equipe experiente oferece consultoria personalizada para encontrar a solução ideal para sua visão."
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "Variedade de Armações e Lentes",
      description: "Amplo catálogo com as melhores marcas e modelos, desde os clássicos até as tendências mais modernas."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Garantia de Qualidade",
      description: "Trabalhamos apenas com fornecedores certificados e oferecemos garantia em todos os nossos produtos."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Por que escolher a Ótica Vitorino?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Combinamos tradição, qualidade e inovação para cuidar da sua visão
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md bg-white"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;