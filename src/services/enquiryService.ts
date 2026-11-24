import { isSupabaseConfigured, supabase, EnquiryInsert } from '../lib/supabase';

export interface SubmitEnquiryParams {
  name: string;
  phone: string;
  doorType: string;
  message: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

export interface SubmitEnquiryResult {
  success: boolean;
  referenceId: string;
  error?: string;
  savedToDatabase: boolean;
}

/**
 * Generates an elegant, human-readable enquiry reference code (e.g. DW-8B4K)
 */
export function generateReferenceCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DW-${code}`;
}

/**
 * Submits an enquiry to Supabase securely.
 * Falls back gracefully to offline/local reference tracking if environment variables are not set.
 */
export async function submitEnquiry(params: SubmitEnquiryParams): Promise<SubmitEnquiryResult> {
  const referenceId = generateReferenceCode();
  const trimmedName = params.name.trim();
  const trimmedPhone = params.phone.trim();
  const trimmedMessage = params.message.trim();

  const payload: EnquiryInsert = {
    name: trimmedName,
    phone: trimmedPhone,
    door_type: params.doorType,
    message: trimmedMessage,
    source: params.source || 'contact_section',
    metadata: {
      ...params.metadata,
      referenceId,
      submittedAt: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
    },
  };

  if (!isSupabaseConfigured() || !supabase) {
    console.info(
      '[Door World] Supabase credentials not found in local environment. Proceeding with fallback reference:',
      referenceId
    );
    return {
      success: true,
      referenceId,
      savedToDatabase: false,
    };
  }

  try {
    const { error } = await supabase.from('enquiries').insert([payload]);

    if (error) {
      console.warn('[Door World] Supabase enquiry insert warning:', error.message);
      return {
        success: false,
        referenceId,
        error: error.message,
        savedToDatabase: false,
      };
    }

    return {
      success: true,
      referenceId,
      savedToDatabase: true,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown network error';
    console.warn('[Door World] Unexpected network error during enquiry submission:', errorMessage);
    return {
      success: false,
      referenceId,
      error: errorMessage,
      savedToDatabase: false,
    };
  }
}

/**
 * Tests connection to the configured Supabase project
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  details?: Record<string, unknown>;
}> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      connected: false,
      message: 'Supabase credentials (VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY) are not set in .env.local.',
    };
  }

  try {
    const { count, error } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return {
        connected: false,
        message: `Endpoint reachable, but table query returned: ${error.message}`,
        details: { code: error.code, hint: error.hint },
      };
    }

    return {
      connected: true,
      message: 'Connected to Supabase successfully. public.enquiries table is accessible.',
      details: { totalRowCount: count },
    };
  } catch (err: unknown) {
    return {
      connected: false,
      message: `Failed to connect to Supabase: ${err instanceof Error ? err.message : 'Network error'}`,
    };
  }
}
