import { supabase } from "@/integrations/supabase/client";

export interface CRMUser {
  id: string;
  email: string;
  nome: string;
  role: 'gerente' | 'estoquista' | 'vendedor' | 'marketing';
}

class CRMAuth {
  private user: CRMUser | null = null;
  private token: string | null = null;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const storedUser = localStorage.getItem('crm_user');
    const storedToken = localStorage.getItem('crm_token');
    
    if (storedUser && storedToken) {
      this.user = JSON.parse(storedUser);
      this.token = storedToken;
    }
  }

  async login(email: string, password: string) {
    const { data, error } = await supabase.functions.invoke('crm-auth', {
      body: {
        action: 'login',
        email,
        password
      }
    });

    if (error) {
      throw new Error('Erro de conexão');
    }

    if (data.error) {
      throw new Error(data.error);
    }

    this.user = data.user;
    this.token = data.token;

    localStorage.setItem('crm_user', JSON.stringify(this.user));
    localStorage.setItem('crm_token', this.token);

    return data;
  }

  async register(email: string, password: string, nome: string, role?: string) {
    const { data, error } = await supabase.functions.invoke('crm-auth', {
      body: {
        action: 'register',
        email,
        password,
        nome,
        role
      }
    });

    if (error) {
      throw new Error('Erro de conexão');
    }

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  }

  async verifyToken() {
    if (!this.token) {
      throw new Error('Token não encontrado');
    }

    const { data, error } = await supabase.functions.invoke('crm-auth', {
      body: {
        action: 'verify',
        token: this.token
      }
    });

    if (error || data.error) {
      this.logout();
      throw new Error('Token inválido');
    }

    this.user = data.user;
    localStorage.setItem('crm_user', JSON.stringify(this.user));

    return data;
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('crm_user');
    localStorage.removeItem('crm_token');
  }

  getUser(): CRMUser | null {
    return this.user;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return this.user !== null && this.token !== null;
  }

  hasPermission(resource: string, action: 'ler' | 'criar' | 'editar' | 'deletar'): boolean {
    if (!this.user) return false;

    // Gerente tem acesso total
    if (this.user.role === 'gerente') return true;

    // Definir permissões por role
    const permissions = {
      estoquista: {
        produtos: ['ler', 'criar', 'editar', 'deletar']
      },
      vendedor: {
        produtos: ['ler'],
        analytics: ['ler']
      },
      marketing: {
        produtos: ['ler'],
        analytics: ['ler'],
        conteudo: ['ler', 'criar', 'editar']
      }
    };

    const rolePermissions = permissions[this.user.role as keyof typeof permissions];
    if (!rolePermissions) return false;

    const resourcePermissions = rolePermissions[resource as keyof typeof rolePermissions];
    if (!resourcePermissions) return false;

    return resourcePermissions.includes(action);
  }
}

export const crmAuth = new CRMAuth();