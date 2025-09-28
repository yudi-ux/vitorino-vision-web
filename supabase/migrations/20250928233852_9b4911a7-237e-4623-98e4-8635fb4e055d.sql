-- Criar enum para roles do sistema CRM
CREATE TYPE public.crm_role AS ENUM ('gerente', 'estoquista', 'vendedor', 'marketing');

-- Criar tabela de usuários CRM (separada dos usuários normais do site)
CREATE TABLE public.crm_users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    nome TEXT NOT NULL,
    role crm_role NOT NULL DEFAULT 'vendedor',
    ativo BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    ultimo_acesso TIMESTAMP WITH TIME ZONE,
    criado_por UUID REFERENCES public.crm_users(id)
);

-- Tabela de permissões por role
CREATE TABLE public.crm_permissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    role crm_role NOT NULL,
    recurso TEXT NOT NULL, -- 'produtos', 'usuarios', 'analytics', 'conteudo', 'configuracoes'
    pode_ler BOOLEAN NOT NULL DEFAULT false,
    pode_criar BOOLEAN NOT NULL DEFAULT false,
    pode_editar BOOLEAN NOT NULL DEFAULT false,
    pode_deletar BOOLEAN NOT NULL DEFAULT false
);

-- Tabela de produtos gerenciáveis pelo CRM
CREATE TABLE public.crm_produtos (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    categoria TEXT NOT NULL, -- 'oculos-de-grau', 'oculos-de-sol', 'lentes', 'armacoes', 'relogios'
    nome TEXT NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2),
    preco_promocional DECIMAL(10,2),
    em_estoque BOOLEAN NOT NULL DEFAULT true,
    quantidade_estoque INTEGER DEFAULT 0,
    imagem_url TEXT,
    caracteristicas JSONB DEFAULT '{}',
    ativo BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    criado_por UUID REFERENCES public.crm_users(id),
    atualizado_por UUID REFERENCES public.crm_users(id)
);

-- Tabela de conteúdo do site gerenciável
CREATE TABLE public.crm_conteudo (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    tipo TEXT NOT NULL, -- 'hero_titulo', 'hero_subtitulo', 'sobre_texto', 'contato_telefone', etc.
    chave TEXT NOT NULL UNIQUE, -- identificador único para cada conteúdo
    valor TEXT NOT NULL,
    descricao TEXT, -- descrição para o admin entender o que é
    ativo BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    atualizado_por UUID REFERENCES public.crm_users(id)
);

-- Tabela de analytics do site
CREATE TABLE public.crm_analytics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    evento TEXT NOT NULL, -- 'page_view', 'produto_visualizado', 'contato_enviado', etc.
    dados JSONB DEFAULT '{}',
    ip_origem TEXT,
    user_agent TEXT,
    referrer TEXT,
    criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de sessões CRM
CREATE TABLE public.crm_sessions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.crm_users(id) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    expira_em TIMESTAMP WITH TIME ZONE NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.crm_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_conteudo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_sessions ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para crm_users
CREATE POLICY "Usuários podem ver próprio perfil" ON public.crm_users
    FOR SELECT USING (id = (current_setting('app.current_user_id', true))::uuid);

CREATE POLICY "Gerentes podem ver todos usuários" ON public.crm_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.crm_users 
            WHERE id = (current_setting('app.current_user_id', true))::uuid 
            AND role = 'gerente'
        )
    );

CREATE POLICY "Gerentes podem criar usuários" ON public.crm_users
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.crm_users 
            WHERE id = (current_setting('app.current_user_id', true))::uuid 
            AND role = 'gerente'
        )
    );

CREATE POLICY "Gerentes podem editar usuários" ON public.crm_users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.crm_users 
            WHERE id = (current_setting('app.current_user_id', true))::uuid 
            AND role = 'gerente'
        )
    );

-- Políticas para produtos
CREATE POLICY "Usuários logados podem ver produtos" ON public.crm_produtos
    FOR SELECT USING ((current_setting('app.current_user_id', true))::uuid IS NOT NULL);

CREATE POLICY "Estoquistas e gerentes podem editar produtos" ON public.crm_produtos
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.crm_users 
            WHERE id = (current_setting('app.current_user_id', true))::uuid 
            AND role IN ('gerente', 'estoquista')
        )
    );

-- Políticas para conteúdo
CREATE POLICY "Usuários logados podem ver conteúdo" ON public.crm_conteudo
    FOR SELECT USING ((current_setting('app.current_user_id', true))::uuid IS NOT NULL);

CREATE POLICY "Gerentes podem editar conteúdo" ON public.crm_conteudo
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.crm_users 
            WHERE id = (current_setting('app.current_user_id', true))::uuid 
            AND role = 'gerente'
        )
    );

-- Políticas para analytics
CREATE POLICY "Usuários logados podem ver analytics" ON public.crm_analytics
    FOR SELECT USING ((current_setting('app.current_user_id', true))::uuid IS NOT NULL);

CREATE POLICY "Qualquer um pode inserir analytics" ON public.crm_analytics
    FOR INSERT WITH CHECK (true);

-- Políticas para sessões
CREATE POLICY "Usuários podem ver próprias sessões" ON public.crm_sessions
    FOR SELECT USING (user_id = (current_setting('app.current_user_id', true))::uuid);

CREATE POLICY "Usuários podem criar próprias sessões" ON public.crm_sessions
    FOR INSERT WITH CHECK (user_id = (current_setting('app.current_user_id', true))::uuid);

-- Inserir permissões padrão
INSERT INTO public.crm_permissions (role, recurso, pode_ler, pode_criar, pode_editar, pode_deletar) VALUES
-- Gerente tem acesso total
('gerente', 'produtos', true, true, true, true),
('gerente', 'usuarios', true, true, true, true),
('gerente', 'analytics', true, false, false, false),
('gerente', 'conteudo', true, true, true, true),
('gerente', 'configuracoes', true, true, true, true),

-- Estoquista pode apenas gerenciar produtos
('estoquista', 'produtos', true, true, true, true),
('estoquista', 'usuarios', false, false, false, false),
('estoquista', 'analytics', false, false, false, false),
('estoquista', 'conteudo', false, false, false, false),
('estoquista', 'configuracoes', false, false, false, false),

-- Vendedor pode ver produtos e analytics básicos
('vendedor', 'produtos', true, false, false, false),
('vendedor', 'usuarios', false, false, false, false),
('vendedor', 'analytics', true, false, false, false),
('vendedor', 'conteudo', false, false, false, false),
('vendedor', 'configuracoes', false, false, false, false),

-- Marketing pode gerenciar conteúdo e ver analytics
('marketing', 'produtos', true, false, false, false),
('marketing', 'usuarios', false, false, false, false),
('marketing', 'analytics', true, false, false, false),
('marketing', 'conteudo', true, true, true, false),
('marketing', 'configuracoes', false, false, false, false);

-- Inserir conteúdo padrão do site
INSERT INTO public.crm_conteudo (tipo, chave, valor, descricao) VALUES
('titulo', 'hero_titulo', 'Ótica Vitorino', 'Título principal da página inicial'),
('subtitulo', 'hero_subtitulo', 'Sua visão é nossa prioridade', 'Subtítulo da seção hero'),
('texto', 'sobre_empresa', 'Com mais de 20 anos de experiência...', 'Texto da seção sobre a empresa'),
('contato', 'telefone', '(11) 99999-9999', 'Telefone de contato'),
('contato', 'email', 'contato@oticavitorino.com.br', 'Email de contato'),
('contato', 'endereco', 'Rua das Flores, 123 - Centro', 'Endereço da loja');

-- Inserir usuário gerente padrão (senha: admin123)
INSERT INTO public.crm_users (email, password_hash, nome, role) VALUES
('admin@oticavitorino.com.br', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador', 'gerente');

-- Inserir alguns produtos de exemplo
INSERT INTO public.crm_produtos (categoria, nome, descricao, preco, quantidade_estoque) VALUES
('oculos-de-grau', 'Óculos Classic Pro', 'Armação clássica em acetato com lentes antirreflexo', 299.90, 15),
('oculos-de-sol', 'Aviador Premium', 'Óculos aviador com proteção UV400', 199.90, 8),
('lentes', 'Lentes Antirreflexo', 'Lentes com tratamento antirreflexo premium', 150.00, 25),
('armacoes', 'Armação Titanium', 'Armação ultra leve em titânio', 399.90, 5),
('relogios', 'Relógio Digital Smart', 'Relógio digital com múltiplas funções', 249.90, 12);

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar timestamps
CREATE TRIGGER update_crm_users_updated_at
    BEFORE UPDATE ON public.crm_users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crm_produtos_updated_at
    BEFORE UPDATE ON public.crm_produtos
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crm_conteudo_updated_at
    BEFORE UPDATE ON public.crm_conteudo
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();