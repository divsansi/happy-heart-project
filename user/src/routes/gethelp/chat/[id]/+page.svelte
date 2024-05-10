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
		serverTimestamp,
		where
	} from 'firebase/firestore';
	import { onMount } from 'svelte';

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
	};

	let message = '';

	export let data;

	const db = getFirestore(app);

	const sendMessage = async (user: any) => {
		if (message.trim() === '') return;

		await addDoc(collection(db, `/counselor/${data.props.id}/chats`), {
			text: message,
			createdAt: serverTimestamp(),
			chatuid: user.uid,
			uid: user.uid
		});
		message = '';
	};
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
			<Collection
				ref={query(
					collection(db, `/counselor/${data.props.id}/chats`),
					where('chatuid', '==', user.uid),
					orderBy('createdAt', 'asc'),
					limit(40)
				)}
				let:data let:count>
				<a class="flex flex-row" style="color: white; width: fit-content; align-items: center; gap: 5px;" href="/gethelp">
					<i class="fa-solid fa-chevron-left" style="color: white;"></i>
					<h1 style="color: white;">Chats</h1>
				</a>
				<div class="flex flex-col" style="height: calc(100vh - 280px); width: 100%; border-radius: 10px; overflow: auto; gap: 10px;">
					{#each data as post}
						<div class={`flex w-full ${post.uid === user.uid ? 'justify-end' : 'justify-start'}`}>
							<div class={`flex items-center ${post.uid === user.uid ? 'flex-row-reverse' : 'flex-row'}`} style="gap: 20px;">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img style="height: 36px; width: 36px; background: #FFFFFF; border-radius: 50px; border: 1px solid #242424;" src={avatar(post.uid)} alt="User image" />
								<div class={`leading-1.5 flex max-w-[320px] flex-col ${post.uid === user.uid ? 'items-end bg-blue-100' : 'items-start bg-gray-100'}`} style="padding: 8px; border-radius: 10px;">
									<p class="light text-gray-900" style="padding: 4px; font-size: 12px;">
										{post.text}
									</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</Collection>
		</section>

	</main>

	<div class="flex flex-row" style="position: fixed; bottom: 64px; left: 0; height: 60px; width: 100%; background: var(--white); align-items: center; justify-content: center; gap: 10px;">
		<input type="text" style="height: 35px; width: 70%; font-size: 12px; border-radius: 10px;" placeholder="Type your message here..." bind:value={message} />
		<button class="flex flex-row" style="height: 35px; width: 15%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;" on:click={() => sendMessage(user)}>Send</button>
	</div>
</SignedIn>