/* eslint-disable @typescript-eslint/ban-ts-comment */
/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;

const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	async function removeOldCaches() {
		const keys = await caches.keys();
		for (const key of keys) {
			if (key !== CACHE) {
				await caches.delete(key);
			}
		}
	}
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	event.waitUntil(removeOldCaches());
});

self.addEventListener('fetch', (event) => {
	async function getResponse() {
		const cache = await caches.open(CACHE);
		// @ts-ignore
		const cachedResponse = await cache.match(event.request);
		if (cachedResponse) {
			return cachedResponse;
		}
		// @ts-ignore
		return fetch(event.request);
	}
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	event.respondWith(getResponse());
});
