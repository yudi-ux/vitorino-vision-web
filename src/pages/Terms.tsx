import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      {/* Header */}
      <header className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <Button 
            onClick={handleBackToHome}
            variant="outline"
            className="mb-4 border-white text-white hover:bg-white hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Início
          </Button>
          <h1 className="text-4xl font-bold text-center">
            Direitos Autorais e Termos de Uso
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Copyright Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Direitos Autorais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                © 2025 Ótica Vitorino. Todos os direitos reservados.
              </p>
              <p>
                Todo o conteúdo presente neste site, incluindo mas não se limitando a textos, 
                imagens, logotipos, ícones, fotografias, vídeos, gráficos, sons e compilações 
                de dados, é propriedade da Ótica Vitorino ou de seus fornecedores de conteúdo 
                e está protegido pelas leis brasileiras e internacionais de direitos autorais.
              </p>
              <p>
                A reprodução, distribuição, exibição ou transmissão de qualquer conteúdo deste 
                site é estritamente proibida sem autorização prévia por escrito da Ótica Vitorino.
              </p>
            </CardContent>
          </Card>

          {/* Terms of Use Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Termos de Uso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">1. Aceitação dos Termos</h3>
                <p>
                  Ao acessar e usar este site, você aceita e concorda em cumprir os termos e 
                  condições de uso aqui estabelecidos. Se você não concordar com estes termos, 
                  não deve usar este site.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">2. Uso do Site</h3>
                <p>
                  Este site destina-se exclusivamente ao fornecimento de informações sobre os 
                  produtos e serviços da Ótica Vitorino. Você se compromete a usar o site apenas 
                  para fins legais e de acordo com estes termos.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">3. Informações do Produto</h3>
                <p>
                  Nos esforçamos para garantir que as informações sobre produtos e preços sejam 
                  precisas e atualizadas. No entanto, não garantimos a precisão completa dessas 
                  informações e reservamos o direito de corrigir erros, imprecisões ou omissões 
                  a qualquer momento.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">4. Privacidade</h3>
                <p>
                  Respeitamos sua privacidade e nos comprometemos a proteger suas informações 
                  pessoais. Os dados coletados através deste site são utilizados exclusivamente 
                  para melhorar nossos serviços e entrar em contato quando necessário.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">5. Limitação de Responsabilidade</h3>
                <p>
                  A Ótica Vitorino não se responsabiliza por danos diretos, indiretos, incidentais 
                  ou consequenciais resultantes do uso ou incapacidade de usar este site.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">6. Modificações</h3>
                <p>
                  Reservamos o direito de modificar estes termos de uso a qualquer momento. 
                  As modificações entrarão em vigor imediatamente após sua publicação no site.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">7. Lei Aplicável</h3>
                <p>
                  Estes termos são regidos pelas leis brasileiras. Qualquer disputa será 
                  resolvida nos tribunais competentes da cidade de Ipu, Estado do Ceará.
                </p>
              </div>

            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Contato</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                Para questões relacionadas a direitos autorais ou termos de uso, 
                entre em contato conosco:
              </p>
              <div className="mt-4 space-y-2">
                <p><strong>Endereço:</strong> R. Padre Corrêa, 1197 - Centro, Ipu - CE, 62250-000</p>
                <p><strong>Horário:</strong> 7h às 12h e 14h às 17h</p>
                <p><strong>WhatsApp:</strong> Entre em contato pelo nosso site</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Terms;