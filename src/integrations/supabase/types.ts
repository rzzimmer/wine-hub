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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      connector_accounts: {
        Row: {
          config: Json
          connected_by: string | null
          id: string
          last_error: string | null
          last_synced_at: string | null
          provider: string
          status: string
          token_encrypted: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          config?: Json
          connected_by?: string | null
          id?: string
          last_error?: string | null
          last_synced_at?: string | null
          provider: string
          status?: string
          token_encrypted: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          config?: Json
          connected_by?: string | null
          id?: string
          last_error?: string | null
          last_synced_at?: string | null
          provider?: string
          status?: string
          token_encrypted?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "connector_accounts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      connector_metrics: {
        Row: {
          collected_at: string
          id: string
          metric_key: string
          period: string
          provider: string
          value: number
          workspace_id: string
        }
        Insert: {
          collected_at?: string
          id?: string
          metric_key: string
          period: string
          provider: string
          value: number
          workspace_id: string
        }
        Update: {
          collected_at?: string
          id?: string
          metric_key?: string
          period?: string
          provider?: string
          value?: number
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "connector_metrics_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      cronograma_posts: {
        Row: {
          created_at: string
          created_by: string | null
          cta: string | null
          data_programada: string
          gancho: string | null
          id: string
          legenda: string | null
          meta_account_id: string | null
          meta_media_id: string | null
          pilar_conteudo: string | null
          status: string
          titulo: string
          updated_at: string
          url_midia: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          cta?: string | null
          data_programada: string
          gancho?: string | null
          id?: string
          legenda?: string | null
          meta_account_id?: string | null
          meta_media_id?: string | null
          pilar_conteudo?: string | null
          status?: string
          titulo: string
          updated_at?: string
          url_midia?: string | null
          workspace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          cta?: string | null
          data_programada?: string
          gancho?: string | null
          id?: string
          legenda?: string | null
          meta_account_id?: string | null
          meta_media_id?: string | null
          pilar_conteudo?: string | null
          status?: string
          titulo?: string
          updated_at?: string
          url_midia?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cronograma_posts_meta_account_fk"
            columns: ["meta_account_id"]
            isOneToOne: false
            referencedRelation: "meta_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cronograma_posts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      meta_accounts: {
        Row: {
          access_token_encrypted: string
          connected_at: string
          connected_by: string | null
          fb_page_id: string
          id: string
          ig_business_id: string
          ig_username: string
          token_expires_at: string | null
          updated_at: string
          workspace_id: string
        }
        Insert: {
          access_token_encrypted: string
          connected_at?: string
          connected_by?: string | null
          fb_page_id: string
          id?: string
          ig_business_id: string
          ig_username: string
          token_expires_at?: string | null
          updated_at?: string
          workspace_id: string
        }
        Update: {
          access_token_encrypted?: string
          connected_at?: string
          connected_by?: string | null
          fb_page_id?: string
          id?: string
          ig_business_id?: string
          ig_username?: string
          token_expires_at?: string | null
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meta_accounts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      pilares: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string
          workspace_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name: string
          workspace_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          name?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pilares_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_admins: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      posts_metrics: {
        Row: {
          account_id: string | null
          all_plays: number | null
          ano: number | null
          avg_watch_time: number | null
          collected_at: string | null
          comments: number | null
          cronograma_id: string | null
          cta: string | null
          data_publicacao: string | null
          duracao_video: number | null
          follows: number | null
          formato: string | null
          gancho: string | null
          id: string
          legenda: string | null
          likes: number | null
          linha_visual: string | null
          link_post: string | null
          mes: number | null
          meta_media_id: string | null
          pilar: string | null
          platform: string | null
          produto: string | null
          profile_activity: number | null
          profile_visits: number | null
          reach: number | null
          replays: number | null
          saved: number | null
          score_criativo: number | null
          semana: number | null
          shares: number | null
          skip_rate: number | null
          status_preenchimento: boolean | null
          taxa_comentario: number | null
          taxa_compartilhamento: number | null
          taxa_engajamento: number | null
          taxa_follow: number | null
          taxa_intencao: number | null
          taxa_salvamento: number | null
          taxa_valor: number | null
          taxa_visita_perfil: number | null
          tema: string | null
          tipo_midia: string | null
          total_interactions: number | null
          total_watch_time: number | null
          updated_at: string
          views: number | null
          workspace_id: string
        }
        Insert: {
          account_id?: string | null
          all_plays?: number | null
          ano?: number | null
          avg_watch_time?: number | null
          collected_at?: string | null
          comments?: number | null
          cronograma_id?: string | null
          cta?: string | null
          data_publicacao?: string | null
          duracao_video?: number | null
          follows?: number | null
          formato?: string | null
          gancho?: string | null
          id?: string
          legenda?: string | null
          likes?: number | null
          linha_visual?: string | null
          link_post?: string | null
          mes?: number | null
          meta_media_id?: string | null
          pilar?: string | null
          platform?: string | null
          produto?: string | null
          profile_activity?: number | null
          profile_visits?: number | null
          reach?: number | null
          replays?: number | null
          saved?: number | null
          score_criativo?: number | null
          semana?: number | null
          shares?: number | null
          skip_rate?: number | null
          status_preenchimento?: boolean | null
          taxa_comentario?: number | null
          taxa_compartilhamento?: number | null
          taxa_engajamento?: number | null
          taxa_follow?: number | null
          taxa_intencao?: number | null
          taxa_salvamento?: number | null
          taxa_valor?: number | null
          taxa_visita_perfil?: number | null
          tema?: string | null
          tipo_midia?: string | null
          total_interactions?: number | null
          total_watch_time?: number | null
          updated_at?: string
          views?: number | null
          workspace_id: string
        }
        Update: {
          account_id?: string | null
          all_plays?: number | null
          ano?: number | null
          avg_watch_time?: number | null
          collected_at?: string | null
          comments?: number | null
          cronograma_id?: string | null
          cta?: string | null
          data_publicacao?: string | null
          duracao_video?: number | null
          follows?: number | null
          formato?: string | null
          gancho?: string | null
          id?: string
          legenda?: string | null
          likes?: number | null
          linha_visual?: string | null
          link_post?: string | null
          mes?: number | null
          meta_media_id?: string | null
          pilar?: string | null
          platform?: string | null
          produto?: string | null
          profile_activity?: number | null
          profile_visits?: number | null
          reach?: number | null
          replays?: number | null
          saved?: number | null
          score_criativo?: number | null
          semana?: number | null
          shares?: number | null
          skip_rate?: number | null
          status_preenchimento?: boolean | null
          taxa_comentario?: number | null
          taxa_compartilhamento?: number | null
          taxa_engajamento?: number | null
          taxa_follow?: number | null
          taxa_intencao?: number | null
          taxa_salvamento?: number | null
          taxa_valor?: number | null
          taxa_visita_perfil?: number | null
          tema?: string | null
          tipo_midia?: string | null
          total_interactions?: number | null
          total_watch_time?: number | null
          updated_at?: string
          views?: number | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_metrics_cronograma_id_fkey"
            columns: ["cronograma_id"]
            isOneToOne: false
            referencedRelation: "cronograma_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_metrics_cronograma_id_fkey"
            columns: ["cronograma_id"]
            isOneToOne: false
            referencedRelation: "visao_geral_performance"
            referencedColumns: ["cronograma_id"]
          },
          {
            foreignKeyName: "posts_metrics_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      screen_widgets: {
        Row: {
          config: Json
          created_at: string
          id: string
          screen_id: string
          sort_order: number
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          id?: string
          screen_id: string
          sort_order?: number
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          screen_id?: string
          sort_order?: number
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "screen_widgets_screen_id_fkey"
            columns: ["screen_id"]
            isOneToOne: false
            referencedRelation: "tenant_screens"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_screens: {
        Row: {
          created_at: string
          enabled: boolean
          icon: string | null
          id: string
          key: string
          label: string
          sort_order: number
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          icon?: string | null
          id?: string
          key: string
          label: string
          sort_order?: number
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          icon?: string | null
          id?: string
          key?: string
          label?: string
          sort_order?: number
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_screens_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      wine_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          tags: string[]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          tags?: string[]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          tags?: string[]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wines: {
        Row: {
          company: string | null
          consumed_at: string | null
          created_at: string
          id: string
          image_url: string | null
          name: string
          notes: string | null
          pairing: string | null
          price: number | null
          purchase_place: string | null
          rating: number
          status: string
          tags: string[]
          updated_at: string
          user_id: string
          winery: string
        }
        Insert: {
          company?: string | null
          consumed_at?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          name: string
          notes?: string | null
          pairing?: string | null
          price?: number | null
          purchase_place?: string | null
          rating?: number
          status?: string
          tags?: string[]
          updated_at?: string
          user_id: string
          winery: string
        }
        Update: {
          company?: string | null
          consumed_at?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string
          notes?: string | null
          pairing?: string | null
          price?: number | null
          purchase_place?: string | null
          rating?: number
          status?: string
          tags?: string[]
          updated_at?: string
          user_id?: string
          winery?: string
        }
        Relationships: []
      }
      workspace_invites: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by: string
          role: Database["public"]["Enums"]["workspace_role"]
          token: string
          workspace_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          invited_by: string
          role?: Database["public"]["Enums"]["workspace_role"]
          token?: string
          workspace_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          token?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_invites_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_members: {
        Row: {
          invited_at: string
          joined_at: string | null
          role: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Insert: {
          invited_at?: string
          joined_at?: string | null
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Update: {
          invited_at?: string
          joined_at?: string | null
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          brand_color: string
          brand_logo_url: string | null
          config: Json
          created_at: string
          enabled_modules: Json
          id: string
          name: string
          owner_user_id: string
          plan: string
          slug: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          brand_color?: string
          brand_logo_url?: string | null
          config?: Json
          created_at?: string
          enabled_modules?: Json
          id?: string
          name: string
          owner_user_id: string
          plan?: string
          slug: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          brand_color?: string
          brand_logo_url?: string | null
          config?: Json
          created_at?: string
          enabled_modules?: Json
          id?: string
          name?: string
          owner_user_id?: string
          plan?: string
          slug?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      visao_geral_performance: {
        Row: {
          account_id: string | null
          all_plays: number | null
          ano: number | null
          avg_watch_time: number | null
          collected_at: string | null
          comments: number | null
          cronograma_criado_em: string | null
          cronograma_id: string | null
          cta_planejada: string | null
          data_programada: string | null
          data_publicacao: string | null
          duracao_video: number | null
          follows: number | null
          formato: string | null
          gancho_planejado: string | null
          legenda_planejada: string | null
          likes: number | null
          linha_visual: string | null
          link_post: string | null
          mes: number | null
          meta_media_id: string | null
          metrica_id: string | null
          metricas_atualizadas_em: string | null
          pilar_planejado: string | null
          platform: string | null
          produto: string | null
          profile_activity: number | null
          profile_visits: number | null
          reach: number | null
          replays: number | null
          saved: number | null
          score_criativo: number | null
          semana: number | null
          shares: number | null
          skip_rate: number | null
          status_agendamento: string | null
          status_preenchimento: boolean | null
          taxa_comentario: number | null
          taxa_compartilhamento: number | null
          taxa_engajamento: number | null
          taxa_follow: number | null
          taxa_intencao: number | null
          taxa_salvamento: number | null
          taxa_valor: number | null
          taxa_visita_perfil: number | null
          tema: string | null
          tipo_midia: string | null
          titulo: string | null
          total_interactions: number | null
          total_watch_time: number | null
          url_midia: string | null
          views: number | null
          workspace_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cronograma_posts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      connector_account_get_token: {
        Args: { p_id: string; p_key: string }
        Returns: string
      }
      is_platform_admin: { Args: never; Returns: boolean }
      is_workspace_member: {
        Args: {
          p_min_role?: Database["public"]["Enums"]["workspace_role"]
          p_workspace_id: string
        }
        Returns: boolean
      }
      meta_account_get_token: {
        Args: { p_account_id: string; p_key: string }
        Returns: string
      }
      screen_workspace_id: { Args: { p_screen_id: string }; Returns: string }
      storage_workspace_id: { Args: { name: string }; Returns: string }
      upsert_connector_account: {
        Args: {
          p_config: Json
          p_connected_by: string
          p_encryption_key: string
          p_provider: string
          p_token: string
          p_workspace_id: string
        }
        Returns: string
      }
      upsert_meta_account: {
        Args: {
          p_access_token: string
          p_connected_by: string
          p_encryption_key: string
          p_fb_page_id: string
          p_ig_business_id: string
          p_ig_username: string
          p_token_expires_at: string
          p_workspace_id: string
        }
        Returns: string
      }
      workspace_id_for_slug: { Args: { p_slug: string }; Returns: string }
      workspace_invite_accept: { Args: { p_token: string }; Returns: Json }
      workspace_member_details: {
        Args: { p_workspace_id: string }
        Returns: {
          email: string
          full_name: string
          joined_at: string
          role: Database["public"]["Enums"]["workspace_role"]
          user_id: string
        }[]
      }
    }
    Enums: {
      workspace_role: "owner" | "admin" | "editor" | "viewer"
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
      workspace_role: ["owner", "admin", "editor", "viewer"],
    },
  },
} as const
