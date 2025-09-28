import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { crmAuth, CRMUser } from "@/lib/crm-auth";
import { 
  Shield, 
  LogOut, 
  Package, 
  Users, 
  TrendingUp, 
  Edit3, 
  Settings,
  Eye,
  Plus,
  Trash2
} from "lucide-react";

const CRMDashboard = () => {
  const [user, setUser] = useState<CRMUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!crmAuth.isAuthenticated()) {
          navigate("/crm/login");
          return;
        }

        await crmAuth.verifyToken();
        setUser(crmAuth.getUser());
      } catch (error) {
        toast.error("Sessão expirada. Faça login novamente.");
        navigate("/crm/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    crmAuth.logout();
    toast.success("Logout realizado com sucesso!");
    navigate("/crm/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const roleColors = {
    gerente: "bg-red-100 text-red-800",
    estoquista: "bg-blue-100 text-blue-800",
    vendedor: "bg-green-100 text-green-800",
    marketing: "bg-purple-100 text-purple-800"
  };

  const modules = [
    {
      id: "produtos",
      title: "Gestão de Produtos",
      description: "Adicionar, editar e gerenciar produtos",
      icon: Package,
      permissions: ["ler", "criar", "editar", "deletar"],
      href: "/crm/produtos"
    },
    {
      id: "usuarios",
      title: "Gestão de Usuários",
      description: "Gerenciar usuários do sistema",
      icon: Users,
      permissions: ["ler", "criar", "editar", "deletar"],
      href: "/crm/usuarios"
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "Relatórios e estatísticas do site",
      icon: TrendingUp,
      permissions: ["ler"],
      href: "/crm/analytics"
    },
    {
      id: "conteudo",
      title: "Gestão de Conteúdo",
      description: "Editar textos, imagens e informações do site",
      icon: Edit3,
      permissions: ["ler", "criar", "editar"],
      href: "/crm/conteudo"
    },
    {
      id: "configuracoes",
      title: "Configurações",
      description: "Configurações gerais do sistema",
      icon: Settings,
      permissions: ["ler", "editar"],
      href: "/crm/configuracoes"
    }
  ];

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case "ler": return <Eye className="h-3 w-3" />;
      case "criar": return <Plus className="h-3 w-3" />;
      case "editar": return <Edit3 className="h-3 w-3" />;
      case "deletar": return <Trash2 className="h-3 w-3" />;
      default: return null;
    }
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case "ler": return "bg-blue-100 text-blue-800";
      case "criar": return "bg-green-100 text-green-800";
      case "editar": return "bg-yellow-100 text-yellow-800";
      case "deletar": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-xl font-semibold">CRM Ótica Vitorino</h1>
                <p className="text-sm text-gray-600">Sistema de Gerenciamento</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user.nome}</p>
                <Badge className={roleColors[user.role]} variant="secondary">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo, {user.nome}!
          </h2>
          <p className="text-gray-600">
            Selecione um módulo para começar a gerenciar o sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const hasAccess = crmAuth.hasPermission(module.id, "ler");
            const Icon = module.icon;

            return (
              <Card
                key={module.id}
                className={`transition-all duration-200 ${
                  hasAccess
                    ? "hover:shadow-lg cursor-pointer border-border hover:border-primary/50"
                    : "opacity-50 cursor-not-allowed bg-gray-50"
                }`}
                onClick={() => hasAccess && navigate(module.href)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className={`h-8 w-8 ${hasAccess ? "text-primary" : "text-gray-400"}`} />
                    {!hasAccess && (
                      <Badge variant="secondary" className="text-xs">
                        Sem acesso
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                {hasAccess && (
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1">
                      {module.permissions.map((permission) => {
                        const hasPermission = crmAuth.hasPermission(module.id, permission as any);
                        if (!hasPermission) return null;

                        return (
                          <Badge
                            key={permission}
                            variant="secondary"
                            className={`text-xs flex items-center gap-1 ${getPermissionColor(permission)}`}
                          >
                            {getPermissionIcon(permission)}
                            {permission}
                          </Badge>
                        );
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">Estatísticas Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Produtos Ativos</p>
                    <p className="text-2xl font-bold">127</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Vendas Hoje</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Visitantes</p>
                    <p className="text-2xl font-bold">1.2k</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Usuários CRM</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CRMDashboard;