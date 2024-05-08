<script lang="ts">
	import { SignedIn, Collection } from 'sveltefire';
	import { Section } from 'flowbite-svelte-blocks';
	import { Input, Button } from 'flowbite-svelte';
	import { createAvatar } from '@dicebear/core';
	import { identicon } from '@dicebear/collection';
	import { app } from '$lib/firebase';
	import {
		addDoc,
		collection,
		getFirestore,
		limit,
		orderBy,
		query,
		serverTimestamp
	} from 'firebase/firestore';
	import { onMount } from 'svelte';

	const avatar = createAvatar(identicon, {
		seed: 'User',
		backgroundType: ['gradientLinear', 'solid']
	});

	const svg = avatar.toDataUriSync();

	let message = '';

	const db = getFirestore(app);

	const sendMessage = async (user: any) => {
		if (message.trim() === '') return;

		await addDoc(collection(db, 'messages'), {
			text: message,
			createdAt: serverTimestamp(),
			uid: user.uid
		});
		message = '';
	};

	// Firebase query to get latest 20 messages from the collection 'messages' ordered by createdAt
	$: q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'), limit(20));
</script>

<SignedIn let:user>
	<Collection ref={q} let:data let:count>
		<div class="flex flex-col gap-4 overflow-y-auto pb-36 pl-2 pr-4 pt-4">
			{#each data as post}
				<div class={`flex w-full ${post.uid === user.uid ? 'justify-end' : 'justify-start'}`}>
					<div
						class={`flex items-center gap-2.5 ${post.uid === user.uid ? 'flex-row-reverse' : 'flex-row'}`}
					>
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img class="h-8 w-8 rounded-full backdrop-blur-md" src={svg} alt="User image" />
						<div
							class={`leading-1.5 flex max-w-[320px] flex-col ${post.uid === user.uid ? 'items-end bg-blue-100' : 'items-start bg-gray-100'} rounded-xl p-2`}
						>
							<p class="py-1 text-sm font-normal text-gray-900">
								{post.text}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Collection>

	<div class="fixed bottom-0 left-0 right-0 mb-16 flex flex-row gap-4 p-4 backdrop-blur-md">
		<Input type="text" placeholder="Type your message here..." bind:value={message} />
		<Button on:click={() => sendMessage(user)}>Send</Button>
	</div>
</SignedIn>
