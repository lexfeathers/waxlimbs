export function slugify(x: string): string {
	return encodeURIComponent(
		String(x).trim().toLowerCase().replace(/\s+/g, '-')
	);
}
