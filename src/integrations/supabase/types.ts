export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achieved_on: string
          badge_description: string | null
          badge_emoji: string | null
          badge_name: string
          id: string
          user_id: string
        }
        Insert: {
          achieved_on?: string
          badge_description?: string | null
          badge_emoji?: string | null
          badge_name: string
          id?: string
          user_id: string
        }
        Update: {
          achieved_on?: string
          badge_description?: string | null
          badge_emoji?: string | null
          badge_name?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      characters: {
        Row: {
          appearance: Json | null
          created_at: string
          description: string | null
          id: string
          name: string
          story_count: number | null
          traits: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          appearance?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          story_count?: number | null
          traits?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          appearance?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          story_count?: number | null
          traits?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      echo_links: {
        Row: {
          created_at: string
          emotion_similarity_score: number | null
          id: string
          user1_id: string
          user2_id: string
        }
        Insert: {
          created_at?: string
          emotion_similarity_score?: number | null
          id?: string
          user1_id: string
          user2_id: string
        }
        Update: {
          created_at?: string
          emotion_similarity_score?: number | null
          id?: string
          user1_id?: string
          user2_id?: string
        }
        Relationships: []
      }
      emotions: {
        Row: {
          detected_from: string | null
          emotion: Database["public"]["Enums"]["emotion_type"]
          id: string
          intensity: number | null
          raw_input: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          detected_from?: string | null
          emotion: Database["public"]["Enums"]["emotion_type"]
          id?: string
          intensity?: number | null
          raw_input?: string | null
          timestamp?: string
          user_id: string
        }
        Update: {
          detected_from?: string | null
          emotion?: Database["public"]["Enums"]["emotion_type"]
          id?: string
          intensity?: number | null
          raw_input?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string
          detected_emotion: Database["public"]["Enums"]["emotion_type"] | null
          emotion_intensity: number | null
          id: string
          is_locked: boolean | null
          is_public: boolean | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          detected_emotion?: Database["public"]["Enums"]["emotion_type"] | null
          emotion_intensity?: number | null
          id?: string
          is_locked?: boolean | null
          is_public?: boolean | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          detected_emotion?: Database["public"]["Enums"]["emotion_type"] | null
          emotion_intensity?: number | null
          id?: string
          is_locked?: boolean | null
          is_public?: boolean | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_emoji: string | null
          bio: string | null
          created_at: string
          id: string
          preferred_genres: Database["public"]["Enums"]["story_genre"][] | null
          privacy_setting: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_emoji?: string | null
          bio?: string | null
          created_at?: string
          id: string
          preferred_genres?: Database["public"]["Enums"]["story_genre"][] | null
          privacy_setting?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_emoji?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          preferred_genres?: Database["public"]["Enums"]["story_genre"][] | null
          privacy_setting?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      stories: {
        Row: {
          bookmark_position: number | null
          content: string
          created_at: string
          emotion_tag: Database["public"]["Enums"]["emotion_type"]
          genre: Database["public"]["Enums"]["story_genre"] | null
          id: string
          is_public: boolean | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bookmark_position?: number | null
          content: string
          created_at?: string
          emotion_tag: Database["public"]["Enums"]["emotion_type"]
          genre?: Database["public"]["Enums"]["story_genre"] | null
          id?: string
          is_public?: boolean | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bookmark_position?: number | null
          content?: string
          created_at?: string
          emotion_tag?: Database["public"]["Enums"]["emotion_type"]
          genre?: Database["public"]["Enums"]["story_genre"] | null
          id?: string
          is_public?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      story_arcs: {
        Row: {
          character_ids: string[] | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          story_ids: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          character_ids?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          story_ids?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          character_ids?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          story_ids?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      emotion_type:
        | "joy"
        | "sadness"
        | "anger"
        | "fear"
        | "surprise"
        | "disgust"
        | "neutral"
        | "excitement"
        | "nostalgia"
        | "anxiety"
        | "contentment"
        | "frustration"
      story_genre:
        | "fantasy"
        | "sci-fi"
        | "horror"
        | "romance"
        | "mystery"
        | "adventure"
        | "drama"
        | "comedy"
        | "thriller"
        | "historical"
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
      emotion_type: [
        "joy",
        "sadness",
        "anger",
        "fear",
        "surprise",
        "disgust",
        "neutral",
        "excitement",
        "nostalgia",
        "anxiety",
        "contentment",
        "frustration",
      ],
      story_genre: [
        "fantasy",
        "sci-fi",
        "horror",
        "romance",
        "mystery",
        "adventure",
        "drama",
        "comedy",
        "thriller",
        "historical",
      ],
    },
  },
} as const
