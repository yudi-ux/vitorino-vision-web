import { Card, CardContent } from "@/components/ui/card";
import { Eye, Sun, Glasses, Frame, Watch, Stethoscope } from "lucide-react";
import eyeExamImage from "@/assets/eye-exam.jpg";

const Services = () => {
  const services = [
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "Óculos de Grau",
      description: "Consulta especializada e armações personalizadas para sua necessidade visual."
    },
    {
      icon: <Sun className="h-8 w-8 text-primary" />,
      title: "Óculos de Sol",
      description: "Proteção UV completa com estilo e qualidade garantida."
    },
    {
      icon: <Glasses className="h-8 w-8 text-primary" />,
      title: "Lentes de Óculos",
      description: "Lentes multifocais, anti-reflexo e com filtros especiais."
    },
    {
      icon: <Frame className="h-8 w-8 text-primary" />,
      title: "Armações",
      description: "Variedade de marcas e estilos para todos os gostos e idades."
    },
    {
      icon: <Watch className="h-8 w-8 text-primary" />,
      title: "Relógios",
      description: "Coleção exclusiva de relógios com garantia e assistência técnica."
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
      title: "Consulta Especializada",
      description: "Avaliação completa da sua visão com equipamentos modernos."
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Services Content */}
          <div>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Nossos Serviços
              </h2>
              <p className="text-xl text-muted-foreground">
                Soluções completas para cuidar da sua visão com qualidade e profissionalismo
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="p-3 bg-primary/10 rounded-full inline-block group-hover:bg-primary/20 transition-colors duration-300">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img 
              src={eyeExamImage} 
              alt="Equipamentos modernos para exame de vista na Ótica Vitorino"
              className="w-full rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl"></div>
            
            {/* Floating Card */}
            <Card className="absolute -bottom-6 -left-6 bg-white shadow-xl border-0 hidden lg:block">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary mb-1">15+</p>
                  <p className="text-sm text-muted-foreground">Anos de experiência</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;