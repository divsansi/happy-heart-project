import { getSpeeches } from '$lib/firebase';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const speeches = await getSpeeches();

	return {
		speeches
	};
}
