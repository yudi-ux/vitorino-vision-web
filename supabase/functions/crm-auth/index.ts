import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, email, password, nome, role } = await req.json();

    if (action === 'login') {
      console.log('CRM Login attempt for:', email);

      // Buscar usuário pelo email
      const { data: user, error: userError } = await supabase
        .from('crm_users')
        .select('*')
        .eq('email', email)
        .eq('ativo', true)
        .single();

      if (userError || !user) {
        console.log('User not found or error:', userError);
        return new Response(
          JSON.stringify({ error: 'Credenciais inválidas' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        );
      }

      // Verificar senha
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        console.log('Invalid password for user:', email);
        return new Response(
          JSON.stringify({ error: 'Credenciais inválidas' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        );
      }

      // Gerar token de sessão
      const token = crypto.randomUUID();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 horas

      // Criar sessão
      const { error: sessionError } = await supabase
        .from('crm_sessions')
        .insert({
          user_id: user.id,
          token,
          expira_em: expiresAt.toISOString()
        });

      if (sessionError) {
        console.log('Session creation error:', sessionError);
        return new Response(
          JSON.stringify({ error: 'Erro interno do servidor' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }

      // Atualizar último acesso
      await supabase
        .from('crm_users')
        .update({ ultimo_acesso: new Date().toISOString() })
        .eq('id', user.id);

      console.log('Login successful for:', email);

      return new Response(
        JSON.stringify({
          user: {
            id: user.id,
            email: user.email,
            nome: user.nome,
            role: user.role
          },
          token
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (action === 'register') {
      console.log('CRM Register attempt for:', email);

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password);

      // Criar usuário
      const { data: newUser, error: createError } = await supabase
        .from('crm_users')
        .insert({
          email,
          password_hash: hashedPassword,
          nome,
          role: role || 'vendedor'
        })
        .select()
        .single();

      if (createError) {
        console.log('User creation error:', createError);
        return new Response(
          JSON.stringify({ error: 'Erro ao criar usuário' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }

      console.log('User created successfully:', email);

      return new Response(
        JSON.stringify({
          user: {
            id: newUser.id,
            email: newUser.email,
            nome: newUser.nome,
            role: newUser.role
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (action === 'verify') {
      const { token } = await req.json();

      console.log('Token verification attempt');

      // Verificar token válido
      const { data: session, error: sessionError } = await supabase
        .from('crm_sessions')
        .select(`
          *,
          crm_users (*)
        `)
        .eq('token', token)
        .gt('expira_em', new Date().toISOString())
        .single();

      if (sessionError || !session) {
        console.log('Invalid or expired token');
        return new Response(
          JSON.stringify({ error: 'Token inválido ou expirado' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        );
      }

      console.log('Token verified successfully');

      return new Response(
        JSON.stringify({
          user: {
            id: session.crm_users.id,
            email: session.crm_users.email,
            nome: session.crm_users.nome,
            role: session.crm_users.role
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else {
      return new Response(
        JSON.stringify({ error: 'Ação inválida' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

  } catch (error) {
    console.error('CRM Auth error:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});