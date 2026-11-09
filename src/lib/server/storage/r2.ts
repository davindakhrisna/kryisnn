import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
	R2_ACCOUNT_ID,
	R2_ACCESS_KEY_ID,
	R2_SECRET_ACCESS_KEY,
	R2_BUCKET_NAME,
	R2_PUBLIC_URL
} from '$app/env/private';

export interface UploadOptions {
	key: string;
	body: Buffer | Uint8Array | Blob | string;
	contentType?: string;
	bucket?: string;
}

export interface PresignedUrlOptions {
	key: string;
	contentType?: string;
	expiresIn?: number;
	bucket?: string;
}

let clientInstance: S3Client | null = null;

export function getR2Client(): S3Client {
	if (clientInstance) {
		return clientInstance;
	}

	if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
		throw new Error(
			'Cloudflare R2 configuration missing: ensure R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY are set in your environment.'
		);
	}

	clientInstance = new S3Client({
		region: 'auto',
		endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId: R2_ACCESS_KEY_ID,
			secretAccessKey: R2_SECRET_ACCESS_KEY
		}
	});

	return clientInstance;
}

export function getDefaultBucket(): string {
	if (!R2_BUCKET_NAME) {
		throw new Error(
			'Cloudflare R2 bucket missing: ensure R2_BUCKET_NAME is set in your environment.'
		);
	}
	return R2_BUCKET_NAME;
}

export function getPublicUrl(key: string): string {
	const cleanKey = key.replace(/^\/+/, '');
	if (R2_PUBLIC_URL) {
		const base = R2_PUBLIC_URL.replace(/\/+$/, '');
		return `${base}/${cleanKey}`;
	}
	const bucket = R2_BUCKET_NAME || 'bucket';
	return `https://${bucket}.r2.cloudflarestorage.com/${cleanKey}`;
}

export async function uploadObject({
	key,
	body,
	contentType = 'application/octet-stream',
	bucket = getDefaultBucket()
}: UploadOptions): Promise<{ key: string; url: string }> {
	const client = getR2Client();
	const command = new PutObjectCommand({
		Bucket: bucket,
		Key: key,
		Body: body,
		ContentType: contentType
	});

	await client.send(command);
	return {
		key,
		url: getPublicUrl(key)
	};
}

export async function deleteObject(
	key: string,
	bucket: string = getDefaultBucket()
): Promise<void> {
	const client = getR2Client();
	const command = new DeleteObjectCommand({
		Bucket: bucket,
		Key: key
	});

	await client.send(command);
}

export async function getPresignedUploadUrl({
	key,
	contentType = 'application/octet-stream',
	expiresIn = 3600,
	bucket = getDefaultBucket()
}: PresignedUrlOptions): Promise<{
	uploadUrl: string;
	key: string;
	publicUrl: string;
}> {
	const client = getR2Client();
	const command = new PutObjectCommand({
		Bucket: bucket,
		Key: key,
		ContentType: contentType
	});

	const uploadUrl = await getSignedUrl(client, command, { expiresIn });
	return {
		uploadUrl,
		key,
		publicUrl: getPublicUrl(key)
	};
}
