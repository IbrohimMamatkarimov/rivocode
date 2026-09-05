# RivoCode: GitHub → Supabase → live site

Follow these steps in order. You only need to do each setup step once.

## 1. Put the project on GitHub

This folder is not a Git repository yet. Open PowerShell inside the `rivocode` folder and run:

```powershell
git init
git add .
git commit -m "Initial RivoCode app"
```

On [GitHub](https://github.com/new), create a **private** repository named `rivocode`. Do not add a README, `.gitignore`, or licence there because this project already has them. Then copy your repository URL and run:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rivocode.git
git push -u origin main
```

Before pushing, check `git status`. `.env.local` must be listed as ignored, never staged. It contains private Google credentials from the earlier prototype. If a secret was ever pushed, revoke/rotate it immediately.

For future updates:

```powershell
git add .
git commit -m "Describe your change"
git push
```

## 2. Create and configure Supabase

1. Go to [database.new](https://database.new), sign in, choose an organization, name the project `rivocode`, choose a region close to your users, and set a strong database password. Wait until it finishes creating.
2. In **Connect**, copy the **Project URL** and **Publishable key**. Do not copy a secret/service-role key into the app.
3. Copy `.env.example` to `.env.local`, then replace the two placeholders. Keep the existing Google variables if you still need them elsewhere, but they are no longer used by the app.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_public_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Restart the development server after changing environment values:

```powershell
npm run dev
```

## 3. Create the database tables safely

In Supabase, open **SQL Editor** → **New query**, paste the full contents of `supabase/migrations/202609050001_initial_schema.sql`, and click **Run**.

It creates `profiles`, `lesson_progress`, and `user_settings`, plus automatic profile/settings creation for new accounts. Each table has Row Level Security: a user can only read or modify their own records. Do not disable RLS just to make an error disappear.

## 4. Turn on authentication

### Email + password

In **Authentication** → **Providers** → **Email**, enable Email. For initial local testing you can turn off **Confirm email**; for a real public site, turn it back on and configure SMTP before launch. The login page now creates real Supabase accounts and shows useful errors.

### Google sign-in

1. In Google Cloud Console create an OAuth Client ID of type **Web application**.
2. Add `http://localhost:3000` as an authorized JavaScript origin while developing.
3. In its authorized redirect URIs, add the Supabase callback URL shown on Supabase **Authentication** → **Providers** → **Google**. It looks like `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`.
4. Paste the Google Client ID and Client Secret into Supabase's Google provider screen, then enable it. The secret lives in Supabase/Google—not in your Next.js environment file.
5. In Supabase **Authentication** → **URL Configuration**, set Site URL to `http://localhost:3000` and add `http://localhost:3000/auth/callback` to Redirect URLs.

## 5. Test locally

1. Run `npm run dev` and open `http://localhost:3000/login`.
2. Create an email account, or use Google.
3. In Supabase **Authentication** → **Users**, confirm a real user appears.
4. In **Table Editor**, confirm that matching `profiles` and `user_settings` rows appear.
5. Log out, restart the browser, and log in again. The session should survive because Supabase stores it in secure cookies.

## 6. Deploy on Vercel

1. Go to [Vercel](https://vercel.com/new), choose **Import Git Repository**, and select `rivocode`.
2. Keep the detected Next.js preset. Under Environment Variables, add the same three values from `.env.local`, but set `NEXT_PUBLIC_SITE_URL` to your final `https://your-domain.vercel.app` URL.
3. Deploy. Every GitHub push will now create a deployment.
4. Back in Supabase **URL Configuration**, set Site URL to the Vercel production URL and add `https://your-domain.vercel.app/auth/callback` to Redirect URLs.
5. Add the production URL as a Google authorized JavaScript origin too. The Google redirect URI remains the Supabase `/auth/v1/callback` address.
6. Test email and Google sign-in on the live site before sharing it.

## What was changed in this project

- The custom localStorage login and custom Google token exchange were replaced with Supabase Auth.
- `src/proxy.ts` refreshes cookie sessions for Next.js 16.
- `src/app/auth/callback/route.ts` safely exchanges Supabase's PKCE code for a session.
- No service-role secret is used in browser code or committed to Git.

Official references: [Supabase Next.js SSR](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs&package-manager=npm&queryGroups=framework&queryGroups=package-manager), [Supabase Google provider](https://supabase.com/docs/guides/auth/social-login/auth-google), and [redirect URL configuration](https://supabase.com/docs/guides/auth/redirect-urls).
