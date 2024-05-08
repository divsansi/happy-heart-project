<script lang="ts">
	import { SignedIn, Collection } from 'sveltefire';
	import { Section } from 'flowbite-svelte-blocks';
	import { Input, Button } from 'flowbite-svelte';
	import { createAvatar } from '@dicebear/core';
	import { identicon } from '@dicebear/collection';
	import { app } from '$lib/firebase';
	import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';

	const avatar = createAvatar(identicon, {
		seed: 'User',
		backgroundType: ['gradientLinear', 'solid']
	});

	const svg = avatar.toDataUriSync();

	let note = '';

	const db = getFirestore(app);

	const saveNote = (auth: any, user: any) => {
		addDoc(collection(db, 'journal', user.uid, 'notes'), {
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
	<!-- Notes -->
	<Collection ref="journal/{user.uid}/notes" let:data let:count>
		<p class="p-2 text-sm font-thin text-gray-400 dark:text-white">
			You have {count} Journal Records
		</p>
		<div
			class=" flex flex-col items-center justify-center gap-4 overflow-y-scroll pb-36 pl-2 pr-4 pt-4"
		>
			{#each orderData(data) as post}
				{#if post.uid === user.uid}
					<div class="flex w-full items-start gap-2.5">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img class="h-8 w-8 rounded-full backdrop-blur-md" src={svg} alt="Jese image" />
						<div
							class="leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl bg-gray-100 p-2 dark:bg-gray-700"
						>
							<div class="flex items-center space-x-2 rtl:space-x-reverse">
								<!-- <span class="text-sm font-semibold text-gray-900 dark:text-white"
									>{user.displayName}</span
								> -->
								<!-- <span class="text-sm font-normal text-white"
								>{post.createdAt}</span
							> -->
							</div>
							<p class="py-1 text-sm font-normal text-gray-900 dark:text-white">
								{post.note}
							</p>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</Collection>

	<!-- Add Journal Note UI -->
	<div class="fixed bottom-0 left-0 right-0 mb-16 flex flex-row gap-4 p-4 backdrop-blur-md">
		<Input type="email" placeholder="Journal Note" size="md" bind:value={note} />
		<Button
			on:click={() => {
				saveNote(auth, user);
			}}>Save</Button
		>
	</div>
</SignedIn>
