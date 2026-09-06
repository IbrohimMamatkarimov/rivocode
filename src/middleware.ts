import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Keeps the Supabase auth cookie fresh on every request. This is what makes
// sign-in reliable on the very first attempt: after the OAuth callback route
// exchanges the code for a session, this middleware is what actually
// re-validates and re-writes the session cookie on the subsequent navigation
// to /dashboard (or wherever `next` points). Without it, that first request
// can render with a stale/partial cookie and look "not signed in" until a
// second request gives the cookie a chance to catch up.
export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Supabase isn't configured yet — nothing to refresh, let the request through.
  if (!url || !key) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Mirror the incoming cookies onto the request so any code reading
        // request.cookies later in this pass sees the fresh values...
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        // ...then rebuild the response from that updated request and write
        // the same cookies onto it so the browser actually receives them.
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Do not add logic between createServerClient and getUser(). getUser()
  // is what triggers the token refresh and cookie rewrite above — anything
  // in between risks reading stale auth state.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    // Run on everything except static assets and image optimization files,
    // so the session cookie stays fresh across normal page navigation.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
