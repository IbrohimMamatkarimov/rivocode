import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client for use in Server Components, Server Actions, and Route Handlers.
// Reads/writes the session via cookies so it works with SSR.
export async function createClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase is not configured. Add the public URL and publishable key to .env.local.");
  }

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll was called from a Server Component (no request/response
            // to write to). This is safe to ignore as long as middleware.ts
            // is also refreshing the session on every request.
          }
        },
      },
    }
  );
}
