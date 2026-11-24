import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface EnquiryRow {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string;
  door_type: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed' | 'archived';
  metadata: Record<string, unknown>;
  notes: string | null;
}

export type EnquiryInsert = Omit<EnquiryRow, 'id' | 'created_at' | 'updated_at' | 'status' | 'notes'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
  status?: EnquiryRow['status'];
  notes?: string | null;
  metadata?: Record<string, unknown>;
};

export interface Database {
  public: {
    Tables: {
      enquiries: {
        Row: EnquiryRow;
        Insert: EnquiryInsert;
        Update: Partial<EnquiryInsert>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabasePublishableKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabasePublishableKey &&
    supabaseUrl.trim().length > 0 &&
    supabasePublishableKey.trim().length > 0 &&
    !supabaseUrl.includes('MY_SUPABASE_URL') &&
    !supabaseUrl.includes('your-project') &&
    supabaseUrl.startsWith('https://')
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabasePublishableKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
