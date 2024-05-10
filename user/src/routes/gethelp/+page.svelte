<script lang="ts">
	import { identicon } from '@dicebear/collection';
	import { createAvatar } from '@dicebear/core';
	import { SignedIn } from 'sveltefire';
	import { onMount } from 'svelte';
	import { collection, query, where, getFirestore, getDocs, orderBy, limit } from 'firebase/firestore';
	import { app } from '$lib/firebase';

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
	};

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

	onMount(() => {
		fetchCounselors();
		// Consider setting up a real-time listener or periodically refreshing the list
	});
</script>


<SignedIn let:user>
	<section id="topBar" class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between; padding: 25px; margin-bottom: -20px; background: transparent; position: sticky; top: 0; backdrop-filter: blur(25px);">
		<img class="topbarLogo" src="https://i.postimg.cc/sgx3L1gg/logotext-2.png" alt="Logo">

		<div class="userpfp">
			<img src="{avatar(user.uid)}" alt="Profile">
		</div>

		<script>
			const userpfp = document.querySelector('.userpfp');

			if (window.location.pathname === '/login' || window.location.pathname === '/register' ||  window.location.pathname === '/logout') {
				userpfp.style.display = 'none';
			}

			window.addEventListener('scroll', () => {
				const topBar = document.getElementById('topBar');
				if (window.scrollY > 0) {
					topBar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
					topBar.style.transition = 'box-shadow 0.5s';
				} else {
					topBar.style.boxShadow = 'none';
					topBar.style.transition = 'box-shadow 0.5s';
				}
			});
		</script>
	</section>

	<main>

		<section class="flex flex-col" style="justify-content: center; gap: 20px;">
			<h1 style="color: white;">Available Counselors</h1>

			<div class="flex flex-col" style="height: calc(100vh - 280px); width: 100%; border-radius: 10px; overflow: auto; gap: 10px;">
				{#each counselors as counselor}
					<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href={`/gethelp/chat/${counselor.id}`}>
						<span class="flex flex-col" style="gap: 2px;">
							<h1>{counselorDisplayName(counselor)}</h1>
							<p class="light" style="color: var(--grey); font-size: 10px; text-transform: uppercase;">Connect</p>
						</span>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</a>
				{/each}
				{#if counselors.length === 0}
					<p class="light" style="color: white;">No counselors available at the moment</p>
				{/if}
			</div>
		</section>
	</main>
</SignedIn>