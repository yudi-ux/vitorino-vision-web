import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CategoryPage = () => {
  const { category } = useParams();
  
  const categoryData: Record<string, any> = {
    "oculos-de-grau": {
      title: "Óculos de Grau",
      description: "Armações modernas e confortáveis para uso diário",
      products: [
        {
          id: 1,
          name: "Armação Clássica Elegante",
          brand: "Ray-Ban",
          type: "Acetato",
          design: "Retangular",
          image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=300&fit=crop"
        },
        {
          id: 2,
          name: "Modelo Executivo Premium",
          brand: "Oakley",
          type: "Metal",
          design: "Aviador",
          image: "https://images.unsplash.com/photo-1556306535-38febf6782e7?w=300&h=300&fit=crop"
        },
        {
          id: 3,
          name: "Design Moderno Jovem",
          brand: "Vogue",
          type: "Acetato",
          design: "Redondo",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop"
        },
        {
          id: 4,
          name: "Estilo Vintage Retrô",
          brand: "Persol",
          type: "Acetato",
          design: "Cat-eye",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop"
        }
      ]
    },
    "oculos-de-sol": {
      title: "Óculos de Sol",
      description: "Proteção UV com estilo e elegância",
      products: [
        {
          id: 1,
          name: "Aviador Clássico",
          brand: "Ray-Ban",
          type: "Metal",
          design: "Aviador",
          image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop"
        },
        {
          id: 2,
          name: "Esportivo Performance",
          brand: "Oakley",
          type: "Polímero",
          design: "Esportivo",
          image: "https://images.unsplash.com/photo-1582142306909-195724d33e8c?w=300&h=300&fit=crop"
        },
        {
          id: 3,
          name: "Feminino Elegante",
          brand: "Vogue",
          type: "Acetato",
          design: "Butterfly",
          image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=300&fit=crop"
        },
        {
          id: 4,
          name: "Unissex Moderno",
          brand: "Police",
          type: "Metal",
          design: "Quadrado",
          image: "https://images.unsplash.com/photo-1556306535-38febf6782e7?w=300&h=300&fit=crop"
        }
      ]
    },
    "lentes-de-oculos": {
      title: "Lentes de Óculos",
      description: "Lentes de alta qualidade com tecnologia avançada",
      products: [
        {
          id: 1,
          name: "Lente Antirreflexo Premium",
          brand: "Zeiss",
          type: "Antirreflexo",
          design: "Multifocal",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop"
        },
        {
          id: 2,
          name: "Lente Transitions",
          brand: "Essilor",
          type: "Fotossensível",
          design: "Monofocal",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop"
        },
        {
          id: 3,
          name: "Lente Blue Light",
          brand: "Hoya",
          type: "Filtro Azul",
          design: "Progressiva",
          image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=300&fit=crop"
        },
        {
          id: 4,
          name: "Lente Polarizada",
          brand: "Zeiss",
          type: "Polarizada",
          design: "Esportiva",
          image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop"
        }
      ]
    },
    "armacoes": {
      title: "Armações",
      description: "Variedade de estilos para todos os gostos",
      products: [
        {
          id: 1,
          name: "Armação Titanium Leve",
          brand: "Lindberg",
          type: "Titanium",
          design: "Minimalista",
          image: "https://images.unsplash.com/photo-1556306535-38febf6782e7?w=300&h=300&fit=crop"
        },
        {
          id: 2,
          name: "Acetato Italiano Premium",
          brand: "Mazzucchelli",
          type: "Acetato",
          design: "Vintage",
          image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=300&fit=crop"
        },
        {
          id: 3,
          name: "Metal Flexível",
          brand: "Flexon",
          type: "Liga Especial",
          design: "Esportivo",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop"
        },
        {
          id: 4,
          name: "Design Exclusivo",
          brand: "Giorgio Armani",
          type: "Acetato",
          design: "Luxo",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop"
        }
      ]
    },
    "relogios": {
      title: "Relógios",
      description: "Coleção exclusiva de relógios elegantes",
      products: [
        {
          id: 1,
          name: "Relógio Social Clássico",
          brand: "Citizen",
          type: "Analógico",
          design: "Social",
          image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop"
        },
        {
          id: 2,
          name: "Cronógrafo Esportivo",
          brand: "Casio",
          type: "Digital",
          design: "Esportivo",
          image: "https://images.unsplash.com/photo-1548181622-6f2a62b1b8e7?w=300&h=300&fit=crop"
        },
        {
          id: 3,
          name: "Feminino Elegante",
          brand: "Orient",
          type: "Analógico",
          design: "Feminino",
          image: "https://images.unsplash.com/photo-1594534785181-6d41eb12e2c5?w=300&h=300&fit=crop"
        },
        {
          id: 4,
          name: "Automático Premium",
          brand: "Seiko",
          type: "Automático",
          design: "Executivo",
          image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=300&h=300&fit=crop"
        }
      ]
    }
  };

  const currentCategory = categoryData[category || ""];

  if (!currentCategory) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 pb-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Categoria não encontrada</h1>
            <Link to="/">
              <Button variant="premium">Voltar ao início</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleWhatsApp = (productName: string) => {
    const message = `Olá! Gostaria de mais informações sobre o produto: ${productName}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/558888888888?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link to="/#catalogo">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao catálogo
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {currentCategory.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {currentCategory.description}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCategory.products.map((product: any) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <div className="space-y-1 mb-4 text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-medium">Marca:</span> {product.brand}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Tipo:</span> {product.type}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Design:</span> {product.design}
                    </p>
                  </div>
                  <Button 
                    onClick={() => handleWhatsApp(product.name)}
                    variant="premium"
                    className="w-full font-medium py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Solicite orçamento
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;