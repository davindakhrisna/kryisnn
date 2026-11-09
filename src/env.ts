import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	DATABASE_URL: {
		description: 'The database connection string.',
		schema: (val) => val ?? ''
	},
	ORIGIN: {
		description: 'The app origin (base URL), e.g. `http://localhost:5173`.',
		schema: (val) => val ?? 'http://localhost:5173'
	},
	BETTER_AUTH_SECRET: {
		description:
			'Secret used to sign tokens. For production use 32 characters generated with high entropy. See [Better Auth installation](https://www.better-auth.com/docs/installation).',
		schema: (val) => val ?? ''
	},
	GITHUB_CLIENT_ID: {
		description:
			'GitHub OAuth client ID. See [Better Auth GitHub provider](https://www.better-auth.com/docs/authentication/github).',
		schema: (val) => val ?? ''
	},
	GITHUB_CLIENT_SECRET: {
		description:
			'GitHub OAuth client secret. See [Better Auth GitHub provider](https://www.better-auth.com/docs/authentication/github).',
		schema: (val) => val ?? ''
	},
	GOOGLE_CLIENT_ID: {
		description:
			'Google OAuth client ID. See [Better Auth Google provider](https://www.better-auth.com/docs/authentication/google).',
		schema: (val) => val ?? ''
	},
	GOOGLE_CLIENT_SECRET: {
		description:
			'Google OAuth client secret. See [Better Auth Google provider](https://www.better-auth.com/docs/authentication/google).',
		schema: (val) => val ?? ''
	},
	R2_ACCOUNT_ID: {
		description: 'Cloudflare Account ID for R2 storage.',
		schema: (val) => val ?? ''
	},
	R2_ACCESS_KEY_ID: {
		description: 'Cloudflare R2 S3 Access Key ID.',
		schema: (val) => val ?? ''
	},
	R2_SECRET_ACCESS_KEY: {
		description: 'Cloudflare R2 S3 Secret Access Key.',
		schema: (val) => val ?? ''
	},
	R2_BUCKET_NAME: {
		description: 'Cloudflare R2 Bucket Name.',
		schema: (val) => val ?? ''
	},
	R2_PUBLIC_URL: {
		description: 'Optional public CDN or custom domain URL for Cloudflare R2 assets.',
		schema: (val) => val ?? ''
	}
});
