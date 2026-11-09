# External Services Setup Handbook

This guide details all third-party services, dashboard steps, and credentials required to run this project in both local development and production.

---

## 1. NeonDB (PostgreSQL)

Neon provides the serverless PostgreSQL database accessed via Drizzle ORM.

### Steps:

1. Go to [Neon Console](https://console.neon.tech/) and sign in.
2. Click **Create Project**, choose a project name, region (nearest to your users or Vercel edge), and PostgreSQL version.
3. Once the database is provisioned, go to the **Dashboard** page.
4. Locate the **Connection Details** widget and select **Pooled connection** (recommended for serverless) or **Direct connection**.
5. Copy the connection string. It will look like:
   ```text
   postgresql://<user>:<password>@<endpoint-id>.neon.tech/neondb?sslmode=require
   ```
6. Set in `.env`:
   ```env
   DATABASE_URL="postgresql://<user>:<password>@<endpoint-id>.neon.tech/neondb?sslmode=require"
   ```
7. Push the initial schema:
   ```bash
   pnpm db:push
   ```

---

## 2. Better Auth Secrets

Better Auth handles sessions, cookies, and tokens.

### Steps:

1. Generate a secure 32-character secret in your terminal:
   ```bash
   openssl rand -base64 32
   ```
2. Set `BETTER_AUTH_SECRET` and `ORIGIN` in `.env`:
   ```env
   ORIGIN="http://localhost:5173"
   BETTER_AUTH_SECRET="<generated-secret>"
   ```
   > **Note for Production:** Update `ORIGIN` to your deployed production URL (e.g. `https://yourdomain.com`).

---

## 3. GitHub OAuth Provider

Enables one-click sign-in with GitHub.

### Steps:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers) &rarr; **OAuth Apps**.
2. Click **New OAuth App** (or **Register a new application**).
3. Fill in the application details:
   - **Application name**: Your app name (e.g. `Kryisnn Dev`)
   - **Homepage URL**: `http://localhost:5173` (or production domain)
   - **Authorization callback URL**: `http://localhost:5173/api/auth/callback/github`
     _(For production, register a second OAuth app or update the URL to `https://yourdomain.com/api/auth/callback/github`)_
4. Click **Register application**.
5. Copy the **Client ID**.
6. Click **Generate a new client secret**, then copy the generated secret.
7. Set in `.env`:
   ```env
   GITHUB_CLIENT_ID="<your-github-client-id>"
   GITHUB_CLIENT_SECRET="<your-github-client-secret>"
   ```

---

## 4. Google Cloud OAuth (Gmail / Google Sign-In)

Enables one-click sign-in with Google accounts.

### Steps:

1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Go to **APIs & Services** &rarr; **OAuth consent screen**:
   - Choose **External** user type and click **Create**.
   - Fill in **App name**, **User support email**, and **Developer contact information**.
   - Add default scopes (`.../auth/userinfo.email`, `.../auth/userinfo.profile`, `openid`).
   - Save and proceed. _(In testing mode, add your personal Gmail under "Test users")._
4. Go to **APIs & Services** &rarr; **Credentials**:
   - Click **+ CREATE CREDENTIALS** &rarr; **OAuth client ID**.
   - **Application type**: Web application.
   - **Name**: e.g. `Kryisnn Web App`.
   - **Authorized JavaScript origins**:
     - `http://localhost:5173`
     - _(Add production domain when deploying)_
   - **Authorized redirect URIs**:
     - `http://localhost:5173/api/auth/callback/google`
     - _(Add `https://yourdomain.com/api/auth/callback/google` for production)_
5. Click **Create** and copy the **Client ID** and **Client Secret**.
6. Set in `.env`:
   ```env
   GOOGLE_CLIENT_ID="<client-id>.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="<client-secret>"
   ```

---

## 5. Cloudflare R2 (Object Storage)

Cloudflare R2 provides S3-compatible asset and media storage without egress fees.

### Steps:

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the sidebar, navigate to **R2 Storage** &rarr; **Overview**.
3. Click **Create bucket**:
   - Choose a unique bucket name (e.g. `kryisnn-assets`).
   - Select your preferred location hint (e.g. `Automatic` or `WNAM/ENAM/APAC`).
4. Click **Manage R2 API Tokens** (on the R2 Overview page).
5. Click **Create API Token**:
   - **Permissions**: **Object Read & Write** (or Admin Read & Write).
   - **Apply to**: Specific bucket (`kryisnn-assets`) or all buckets.
   - Click **Create API Token**.
6. Securely copy the displayed credentials:
   - **Access Key ID**
   - **Secret Access Key**
   - **Account ID** (visible in your Cloudflare dashboard URL: `dash.cloudflare.com/<account-id>/...` or on the token summary page).
7. _(Optional)_ Set up Public Access:
   - Open your bucket &rarr; **Settings** &rarr; **Public Access**.
   - Connect a Custom Domain (e.g. `assets.yourdomain.com`) or enable the `r2.dev` managed subdomain.
8. Set in `.env`:
   ```env
   R2_ACCOUNT_ID="<your-cloudflare-account-id>"
   R2_ACCESS_KEY_ID="<your-r2-access-key-id>"
   R2_SECRET_ACCESS_KEY="<your-r2-secret-access-key>"
   R2_BUCKET_NAME="kryisnn-assets"
   R2_PUBLIC_URL="https://assets.yourdomain.com"
   ```

---

## Quick Verification Checklist

Once your `.env` is populated from `.env.example`:

1. Run `pnpm check` to ensure environment types align.
2. Run `pnpm db:push` to verify NeonDB connection and create database tables.
3. Run `pnpm dev` to start the local Vite server at `http://localhost:5173`.
4. Test OAuth sign-ins via `/demo/better-auth/login`.
