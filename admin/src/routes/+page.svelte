<script lang="ts">
	import { createAvatar } from '@dicebear/core';
	import { identicon } from '@dicebear/collection';
	import { SignedIn } from 'sveltefire';
	import { Card, Button, Alert } from 'flowbite-svelte';
	import { getRandomQuote } from '$lib/quotes';
	import { ArrowRightOutline, InfoCircleSolid } from 'flowbite-svelte-icons';

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
	};

	// using time of day to determine the greeting
	const date = new Date();
	const hours = date.getHours();
	let greeting = '';
	if (hours < 12) {
		greeting = 'Good Morning';
	} else if (hours < 18) {
		greeting = 'Good Afternoon';
	} else {
		greeting = 'Good Evening';
	}

	const quote = getRandomQuote();
</script>

<SignedIn let:user>
	<div
		class="flex flex-col items-center justify-center gap-4 overflow-y-scroll pb-24 md:grid md:grid-cols-3 md:pt-16"
	>
		<!-- Welcome Card -->
		<div class="w-full max-w-sm rounded-lg bg-white shadow dark:border-gray-700 dark:bg-gray-800">
			<div class="flex flex-col items-center pb-10 pt-10">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="mb-3 h-24 w-24 rounded-full shadow-lg"
					src={avatar(user.uid)}
					alt="Profile image"
				/>
				<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.displayName}</h5>
				<span class="text-sm text-gray-400">{greeting}!</span>
				<!-- <div class="mt-4 flex md:mt-6">
					<Button
						color="light"
						href="/profile"
						class="rounded-lgpx-4 ms-2 py-2 text-sm font-medium text-gray-900 backdrop-blur-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
						>Profile</Button
					>
				</div> -->
			</div>
		</div>

		<div
			class="w-full max-w-sm rounded-lg shadow backdrop-blur-md dark:border-gray-700 dark:bg-gray-800"
		>
			<figure
				class="flex flex-col items-center justify-center rounded-t-lg p-8 text-center backdrop-blur-md md:rounded-t-none md:rounded-tl-lg md:border-e dark:border-gray-700 dark:bg-gray-800"
			>
				<blockquote class="mx-auto mb-4 max-w-2xl text-white">
					<p class="my-4 font-light">"{quote.QUOTE}"</p>
				</blockquote>
				<div class="space-y-0.5 text-left font-medium dark:text-white">
					<div>- {quote.AUTHOR} -</div>
				</div>
			</figure>
		</div>
	</div>
</SignedIn>
