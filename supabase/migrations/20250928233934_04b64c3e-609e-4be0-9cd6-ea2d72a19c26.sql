-- Corrigir função com CASCADE para remover dependências
DROP FUNCTION public.update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.atualizado_em = now();
    RETURN NEW;
END;
$$;

-- Recriar triggers que foram removidos
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

-- Adicionar políticas faltantes para crm_permissions
CREATE POLICY "Usuários logados podem ver permissões" ON public.crm_permissions
    FOR SELECT USING ((current_setting('app.current_user_id', true))::uuid IS NOT NULL);