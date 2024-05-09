<script lang="ts">
	import { SignedIn, Collection } from 'sveltefire';
	import { Section } from 'flowbite-svelte-blocks';
	import { Input, Button } from 'flowbite-svelte';
	import { createAvatar } from '@dicebear/core';
	import { identicon } from '@dicebear/collection';
	import { app } from '$lib/firebase';
	import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
	};

	let note = '';

	const db = getFirestore(app);

	const saveNote = (auth: any, user: any) => {
		// Check if note is empty
		if (note.trim() === '') {
			alert('Note cannot be empty');
			return;
		}
		addDoc(collection(db, 'status', user.uid, 'status'), {
			note: note,
			createdAt: serverTimestamp(),
			uid: user.uid
		});
		note = '';
	};

	const orderData = (data: any) => {
		return data.sort((a: any, b: any) => {
			return b.createdAt - a.createdAt;
		});
	};
</script>

<SignedIn let:auth let:user>
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
			<Collection ref="status/{user.uid}/status" let:data let:count>
				<h1 style="color: white;">Status ({count} records)</h1>

				<div class="flex flex-col" style="height: calc(100vh - 280px); width: 100%; border-radius: 10px; overflow: auto; gap: 10px;">
					{#each orderData(data) as post}
						{#if post.uid === user.uid}
							<div class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center;">
								<p class="light" style="font-size: 14px; text-transform: none;">{post.note}</p>
							</div>
						{/if}
					{/each}
				</div>
			</Collection>
		</section>

	</main>

	<div class="flex flex-row" style="position: fixed; bottom: 64px; left: 0; height: 60px; width: 100%; background: var(--white); align-items: center; justify-content: center; gap: 10px;">
		<input type="text" style="height: 35px; width: 70%; font-size: 12px; border-radius: 10px;" placeholder="Status Note" bind:value={note} />
		<button class="flex flex-row" style="height: 35px; width: 15%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;" on:click={() => {saveNote(auth, user);}}>Save</button>
	</div>
</SignedIn>
