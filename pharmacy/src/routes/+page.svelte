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

		<section class="flex flex-col" style="background: var(--whiteGrey); padding: 25px; border-radius: 15px; align-items: flex-start; gap: 5px;">
			<div class="flex flex-row" style="align-items: center; gap: 5px;">
				<h1>Welcome</h1>
				<h1 class="light" style="color: var(--blackGrey);">{user && user.displayName ? user.displayName.split(' ')[0] : ''}</h1>
			</div>

			<div class="flex flex-row" style="align-items: center; gap: 5px;">
				<i class="fa-solid fa-location-arrow" style="color: #1B72B5; font-size: 8px;"></i>
				<p class="light" style="font-size: 10px; text-transform: uppercase;" id="location">Fetching...</p>
			</div>

			<script>
				function fetchLocationAndClimate() {
					navigator.geolocation.getCurrentPosition(showLocation, handleError);
				}

				function showLocation(position) {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;

					// Use OpenWeatherMap API to get current weather
					const apiKey = 'df3fc27416418810b999a80051c9d82c';
					const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

					fetch(weatherUrl)
						.then(response => response.json())
						.then(data => {
							const city = data.name;
							const country = data.sys.country;

							const location = document.getElementById("location");
							location.innerHTML = `${city}, ${country}`;
						})
						.catch(error => console.error("Error fetching location:", error));
				}

				function handleError(error) {
					const location = document.getElementById("location");
					location.innerHTML = "Location not available";
					console.error("Error fetching location:", error.message);
				}

				fetchLocationAndClimate();
				setTimeout(fetchLocationAndClimate, 3000);
				setInterval(() => {
					fetchLocationAndClimate();
				}, 10000);
			</script>
		</section>

		<section class="flex flex-col" style="justify-content: center; gap: 20px;">
			<h1 style="color: white;">Prescriptions</h1>

			<div class="flex flex-col" style="height: calc(100vh - 280px); width: 100%; border-radius: 10px; overflow: auto; gap: 10px;">
				{#each data.data as prescription}
					<span class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;">
						<p class="light" style="line-height: 1.4; font-size: 13px; text-transform: uppercase; width: 85%; word-break: break-word; text-align: left;">{prescription.text}</p>
						<button class="flex flex-row" style="background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;" on:click={() => accept(prescription.id, prescription.uid, user.uid)}>Accept</button>
					</span>
				{/each}
				{#if data.data.length === 0}
					<p class="light" style="color: white;">No counselors available at the moment</p>
				{/if}
			</div>
		</section>

	</main>


	<div
		class="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 overflow-y-scroll pb-24"
	>
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
			<p class="light" style="color: white;">No prescriptions available at the moment.</p>
		{/if}
	</div>
</SignedIn>
