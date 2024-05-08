<script lang="ts">
	import { createAvatar } from '@dicebear/core';
	import { identicon } from '@dicebear/collection';
	import { SignedIn } from 'sveltefire';
	import { Card, Label, Input, Button, Textarea } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import toast, { Toaster } from 'svelte-french-toast';
	import type { Speech } from '$lib/firebase';

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
	};

	export let data: {
		speeches: Speech[];
	};

	const videoData = {
		title: '',
		link: '',
		description: ''
	};

	const getThumb = (url: string, size: string) => {
		if (url === null) {
			return '';
		}
		const asize = size === null ? 'big' : size;
		const results = url.match('[\\?&]v=([^&#]*)');
		const video = results === null ? url : results[1];

		if (asize === 'small') {
			return `http://img.youtube.com/vi/${video}/2.jpg`;
		}
		return `http://img.youtube.com/vi/${video}/0.jpg`;
	};
</script>

<Toaster />

<SignedIn let:user>
	<section id="topBar" class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between; padding: 25px; margin-bottom: -20px; background: transparent; position: sticky; top: 0; backdrop-filter: blur(25px); z-index: 10;">
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
			<h1 style="color: white;">Speeches</h1>

			<span class="flex flex-col" style="gap: 20px;">
				{#each data.speeches as speech}
					<Card img={getThumb(speech.link, 'big')}>
						<span class="flex flex-col" style="gap: 15px;">
							<h1 class="medium" style="margin-bottom: -10px;">
								{speech.title}
							</h1>
							<p class="light">
								{speech.description}
							</p>
							<a href={speech.link} target="_blank" class="flex flex-row" style="width: 100%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;">
								View Video <i class="fa-solid fa-arrow-up" style="transform: rotate(45deg);"></i>
							</a>
						</span>
					</Card>
				{/each}
			</span>
		</section>

	</main>
</SignedIn>
