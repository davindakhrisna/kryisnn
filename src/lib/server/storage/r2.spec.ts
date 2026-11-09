import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('$app/env/private', () => ({
	R2_ACCOUNT_ID: 'test-account-id',
	R2_ACCESS_KEY_ID: 'test-access-key',
	R2_SECRET_ACCESS_KEY: 'test-secret-key',
	R2_BUCKET_NAME: 'test-bucket',
	R2_PUBLIC_URL: 'https://cdn.example.com'
}));

vi.mock('@aws-sdk/s3-request-presigner', () => ({
	getSignedUrl: vi.fn().mockResolvedValue('https://upload.signed.example.com/put-object')
}));

vi.mock('@aws-sdk/client-s3', () => {
	const sendMock = vi.fn().mockResolvedValue({});
	class S3Client {
		send = sendMock;
	}
	const PutObjectCommandMock = vi.fn().mockImplementation(function (
		this: Record<string, unknown>,
		args: Record<string, unknown>
	) {
		Object.assign(this, args);
	});
	const DeleteObjectCommandMock = vi.fn().mockImplementation(function (
		this: Record<string, unknown>,
		args: Record<string, unknown>
	) {
		Object.assign(this, args);
	});
	const GetObjectCommandMock = vi.fn().mockImplementation(function (
		this: Record<string, unknown>,
		args: Record<string, unknown>
	) {
		Object.assign(this, args);
	});

	return {
		S3Client,
		PutObjectCommand: PutObjectCommandMock,
		DeleteObjectCommand: DeleteObjectCommandMock,
		GetObjectCommand: GetObjectCommandMock
	};
});

import {
	getR2Client,
	getDefaultBucket,
	getPublicUrl,
	uploadObject,
	deleteObject,
	getPresignedUploadUrl
} from './r2';

describe('Cloudflare R2 Storage', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('returns configured default bucket name', () => {
		expect(getDefaultBucket()).toBe('test-bucket');
	});

	it('formats public URL using custom CDN domain', () => {
		const url = getPublicUrl('uploads/avatar.png');
		expect(url).toBe('https://cdn.example.com/uploads/avatar.png');
	});

	it('strips leading slashes when formatting public URL', () => {
		const url = getPublicUrl('/uploads/avatar.png');
		expect(url).toBe('https://cdn.example.com/uploads/avatar.png');
	});

	it('initializes S3 client with R2 endpoint', () => {
		const client = getR2Client();
		expect(client).toBeDefined();
	});

	it('uploads object and returns public URL', async () => {
		const result = await uploadObject({
			key: 'documents/spec.pdf',
			body: 'sample content',
			contentType: 'application/pdf'
		});

		expect(result).toEqual({
			key: 'documents/spec.pdf',
			url: 'https://cdn.example.com/documents/spec.pdf'
		});
	});

	it('deletes object from bucket', async () => {
		await expect(deleteObject('documents/spec.pdf')).resolves.not.toThrow();
	});

	it('generates presigned upload URL', async () => {
		const result = await getPresignedUploadUrl({
			key: 'uploads/photo.jpg',
			contentType: 'image/jpeg',
			expiresIn: 1800
		});

		expect(result).toEqual({
			uploadUrl: 'https://upload.signed.example.com/put-object',
			key: 'uploads/photo.jpg',
			publicUrl: 'https://cdn.example.com/uploads/photo.jpg'
		});
	});
});
