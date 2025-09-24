import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Star } from "lucide-react";
import storeImage from "@/assets/store-interior.jpg";

const About = () => {
  const values = [
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Missão",
      description: "Oferecer soluções visuais com conforto, estilo e tecnologia de ponta."
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Valores",
      description: "Confiança, qualidade e atendimento personalizado em cada cliente."
    },
    {
      icon: <Star className="h-6 w-6 text-primary" />,
      title: "Diferenciais",
      description: "Equipe experiente, laboratórios renomados e atendimento humanizado."
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Sobre a Ótica Vitorino
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                A Ótica Vitorino é referência em qualidade e confiança em Ipu - CE. 
                Com anos de experiência no mercado óptico, oferecemos soluções 
                completas para cuidar da sua visão com excelência.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossa equipe especializada trabalha com as melhores marcas e 
                tecnologias do mercado, garantindo que você tenha acesso aos 
                produtos mais modernos e eficientes para sua saúde visual.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-md bg-secondary/50">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-primary/10 rounded-full">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img 
              src={storeImage} 
              alt="Interior moderno da Ótica Vitorino em Ipu - CE"
              className="w-full rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;