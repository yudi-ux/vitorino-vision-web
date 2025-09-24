import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b593?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Atendimento excepcional! Encontrei a armação perfeita para o meu rosto. A equipe é muito atenciosa e profissional."
    },
    {
      name: "João Santos",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Qualidade incrível! Meus óculos ficaram perfeitos e o prazo de entrega foi cumprido rigorosamente."
    },
    {
      name: "Ana Costa",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Recomendo para todos! Produtos de primeira qualidade e preços justos. Já sou cliente há mais de 5 anos."
    },
    {
      name: "Carlos Oliveira",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Excelente variedade de marcas e modelos. O atendimento personalizado fez toda a diferença na minha escolha."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Depoimentos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja o que nossos clientes satisfeitos têm a dizer sobre nossos serviços
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover mb-4 ring-4 ring-primary/20"
                  />
                  <div className="flex justify-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 italic leading-relaxed text-sm">
                  "{testimonial.text}"
                </p>
                <h4 className="font-semibold text-foreground">
                  {testimonial.name}
                </h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;