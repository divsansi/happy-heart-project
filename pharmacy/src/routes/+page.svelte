<script lang="ts">
	import { createAvatar } from '@dicebear/core';
	import { identicon } from '@dicebear/collection';
	import { Collection, SignedIn } from 'sveltefire';
	import { Card, Button, Alert } from 'flowbite-svelte';
	import { getRandomQuote } from '../lib/quotes';
	import { ArrowRightOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
	import {
		getFirestore,
		doc,
		setDoc,
		serverTimestamp,
		query,
		collection,
		orderBy,
		limit,
		onSnapshot
	} from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { acceptPrescription } from '$lib/firebase';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data;
	console.log(data);

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
	};
	const db = getFirestore();
	const auth = getAuth();
	let intervalId: any;

	const date = new Date();
	const hours = date.getHours();
	const greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
	const quote = getRandomQuote();

	const accept = async (prescription: string, patient: string, user: string) => {
		await acceptPrescription(prescription, patient, user);
		toast.success('Prescription accepted successfully');
		window.location.href = '/';
	};
</script>

<Toaster />
<SignedIn let:user>
	<div
		class="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 overflow-y-scroll pb-24"
	>
		<!-- Existing Welcome Card, Alert, Quotes, and Navigation Buttons -->
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
				<div class="mt-4 flex md:mt-6">
					<Button
						color="light"
						href="/profile"
						class="rounded-lgpx-4 ms-2 py-2 text-sm font-medium text-gray-900 backdrop-blur-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
						>Profile</Button
					>
				</div>
			</div>
		</div>

		<!-- Chats Section, showing all distinct chats -->
		{#each data.data as prescription}
			<div class="flex w-full flex-col gap-4 rounded-lg p-4 shadow-sm backdrop-blur-md">
				<div class="flex w-full flex-row items-center justify-between gap-4">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<!-- <img class="h-8 w-8 rounded-full backdrop-blur-md" src={avatar(chat.chatuid)} alt="User image" /> -->
					<h2 class="text-wrap text-xs font-semibold">Medication Info</h2>
				</div>
				<div class="flex w-full flex-row items-center justify-between gap-4">
					<div>
						<p class="text-white">{prescription.city}</p>
						<p class="text-white">{prescription.text}</p>
					</div>
					<button
						on:click={() => accept(prescription.id, prescription.uid, user.uid)}
						class="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
					>
						Accept
					</button>
				</div>
			</div>
		{/each}
		{#if data.data.length === 0}
			<p>No prescriptions available at the moment.</p>
		{/if}
	</div>
</SignedIn>
