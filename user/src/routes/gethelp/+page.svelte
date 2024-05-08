<script lang="ts">
	import { onMount } from 'svelte';
	import {
		collection,
		query,
		where,
		getFirestore,
		getDocs,
		orderBy,
		limit
	} from 'firebase/firestore';
	import { app } from '$lib/firebase'; // Ensure this path correctly points to your Firebase configuration

	let counselors: string | any[] = [];
	const db = getFirestore(app);

	async function fetchCounselors() {
		const now = new Date();
		const tenMinutesAgo = new Date(now.getTime() - 10 * 60000);

		const counselorsRef = collection(db, 'counselor');
		const q = query(
			counselorsRef,
			where('available', '>', tenMinutesAgo),
			orderBy('available', 'desc'),
			limit(20) // Adjust the limit as needed
		);

		const querySnapshot = await getDocs(q);
		counselors = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	}

	const counselorDisplayName = (counselor: any) => {
		console.log(counselor);
		return counselor.username;
	};

	// get User displayname from ID

	onMount(() => {
		fetchCounselors();
		// Consider setting up a real-time listener or periodically refreshing the list
	});
</script>

<main class="p-4">
	<h1 class="text-2xl font-bold">Available Counselors</h1>
	<div class=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each counselors as counselor}
			<div class="flex flex-col gap-4 rounded-lg p-4 shadow-sm backdrop-blur-md">
				<div class="flex flex-row items-center justify-between">
					<h2 class="text-xl font-semibold">{counselorDisplayName(counselor)}</h2>
					<a
						href={`/gethelp/chat/${counselor.id}`}
						class="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
					>
						Connect
					</a>
				</div>
				<p class="text-gray-600">Status: Available</p>
			</div>
		{/each}
		{#if counselors.length === 0}
			<p class="text-gray-500">No counselors available at the moment.</p>
		{/if}
	</div>
</main>
