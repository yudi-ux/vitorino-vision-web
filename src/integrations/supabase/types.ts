export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      crm_analytics: {
        Row: {
          criado_em: string
          dados: Json | null
          evento: string
          id: string
          ip_origem: string | null
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          criado_em?: string
          dados?: Json | null
          evento: string
          id?: string
          ip_origem?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          criado_em?: string
          dados?: Json | null
          evento?: string
          id?: string
          ip_origem?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      crm_conteudo: {
        Row: {
          ativo: boolean
          atualizado_em: string
          atualizado_por: string | null
          chave: string
          criado_em: string
          descricao: string | null
          id: string
          tipo: string
          valor: string
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string
          atualizado_por?: string | null
          chave: string
          criado_em?: string
          descricao?: string | null
          id?: string
          tipo: string
          valor: string
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string
          atualizado_por?: string | null
          chave?: string
          criado_em?: string
          descricao?: string | null
          id?: string
          tipo?: string
          valor?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_conteudo_atualizado_por_fkey"
            columns: ["atualizado_por"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_permissions: {
        Row: {
          id: string
          pode_criar: boolean
          pode_deletar: boolean
          pode_editar: boolean
          pode_ler: boolean
          recurso: string
          role: Database["public"]["Enums"]["crm_role"]
        }
        Insert: {
          id?: string
          pode_criar?: boolean
          pode_deletar?: boolean
          pode_editar?: boolean
          pode_ler?: boolean
          recurso: string
          role: Database["public"]["Enums"]["crm_role"]
        }
        Update: {
          id?: string
          pode_criar?: boolean
          pode_deletar?: boolean
          pode_editar?: boolean
          pode_ler?: boolean
          recurso?: string
          role?: Database["public"]["Enums"]["crm_role"]
        }
        Relationships: []
      }
      crm_produtos: {
        Row: {
          ativo: boolean
          atualizado_em: string
          atualizado_por: string | null
          caracteristicas: Json | null
          categoria: string
          criado_em: string
          criado_por: string | null
          descricao: string | null
          em_estoque: boolean
          id: string
          imagem_url: string | null
          nome: string
          preco: number | null
          preco_promocional: number | null
          quantidade_estoque: number | null
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string
          atualizado_por?: string | null
          caracteristicas?: Json | null
          categoria: string
          criado_em?: string
          criado_por?: string | null
          descricao?: string | null
          em_estoque?: boolean
          id?: string
          imagem_url?: string | null
          nome: string
          preco?: number | null
          preco_promocional?: number | null
          quantidade_estoque?: number | null
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string
          atualizado_por?: string | null
          caracteristicas?: Json | null
          categoria?: string
          criado_em?: string
          criado_por?: string | null
          descricao?: string | null
          em_estoque?: boolean
          id?: string
          imagem_url?: string | null
          nome?: string
          preco?: number | null
          preco_promocional?: number | null
          quantidade_estoque?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_produtos_atualizado_por_fkey"
            columns: ["atualizado_por"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_produtos_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_sessions: {
        Row: {
          criado_em: string
          expira_em: string
          id: string
          token: string
          user_id: string
        }
        Insert: {
          criado_em?: string
          expira_em: string
          id?: string
          token: string
          user_id: string
        }
        Update: {
          criado_em?: string
          expira_em?: string
          id?: string
          token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_users: {
        Row: {
          ativo: boolean
          atualizado_em: string
          criado_em: string
          criado_por: string | null
          email: string
          id: string
          nome: string
          password_hash: string
          role: Database["public"]["Enums"]["crm_role"]
          ultimo_acesso: string | null
        }
        Insert: {
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          criado_por?: string | null
          email: string
          id?: string
          nome: string
          password_hash: string
          role?: Database["public"]["Enums"]["crm_role"]
          ultimo_acesso?: string | null
        }
        Update: {
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          criado_por?: string | null
          email?: string
          id?: string
          nome?: string
          password_hash?: string
          role?: Database["public"]["Enums"]["crm_role"]
          ultimo_acesso?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_users_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "crm_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      crm_role: "gerente" | "estoquista" | "vendedor" | "marketing"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      crm_role: ["gerente", "estoquista", "vendedor", "marketing"],
    },
  },
} as const
