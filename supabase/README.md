# DOOR WORLD — Supabase Database Setup & Administration

This directory contains the database migration scripts and administration documentation for the Door World website.

## Supabase Project Details
- **Project Region:** Mumbai (ap-south-1)
- **Primary Table:** `public.enquiries`

## Environment Variables Required

### Production (Vercel) & Local Development (`.env.local`)
```bash
VITE_SUPABASE_URL="https://<your-project-id>.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="<your-publishable-or-anon-key>"
```

> **Security Note:** Never commit `.env.local` or expose the Supabase `service_role` key or database passwords in the frontend codebase.

## Applying the Database Migration

1. Log in to the [Supabase Dashboard](https://supabase.com/dashboard).
2. Open your Door World project in Mumbai.
3. In the left navigation, click **SQL Editor**.
4. Open the SQL file: `supabase/migrations/20261124_create_enquiries_schema.sql`.
5. Copy and paste the entire SQL content into the SQL Editor and click **Run**.
6. Verify that the table `enquiries` appears under **Table Editor** with RLS enabled.

## Security & Row Level Security (RLS)
- **Anonymous Insert:** Public visitors can insert enquiries via the website form without authentication.
- **Privacy Protection:** Anonymous visitors have **zero** read/update/delete access. They cannot query or list leads.
- **Admin Access:** Authenticated users (`authenticated` role) have full CRUD access, ready for the upcoming Door World Admin Panel.
