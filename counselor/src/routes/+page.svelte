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
	import { onMount, onDestroy } from 'svelte';

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
	};
	const db = getFirestore();
	const auth = getAuth();
	let intervalId: any;

	async function updateAvailability() {
		const user = auth.currentUser;
		if (user) {
			const counselorRef = doc(db, `counselor/${user.uid}`);
			await setDoc(
				counselorRef,
				{ available: serverTimestamp(), username: user.displayName },
				{ merge: true }
			);
		}
	}

	onMount(() => {
		updateAvailability();
		intervalId = setInterval(updateAvailability, 30000);
	});

	// get Distinct UIDs from chats
	const duids = (data: any) => {
		let id: string[] = [];
		let dataar: any[] = [];
		console.log(data);

		for (let i in data) {
			if (id.includes(data[i].chatuid)) {
				continue;
			} else {
				id.push(data[i].chatuid);
				dataar.push({
					chatuid: data[i].chatuid
				});
			}
		}

		console.log(dataar);

		return dataar;
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
			<h1 style="color: white;">Available Chats</h1>

			<div class="flex flex-col" style="height: calc(100vh - 280px); width: 100%; border-radius: 10px; overflow: auto; gap: 10px;">
				<Collection ref={`counselor/${user.uid}/chats`} let:data let:count>
					{#each duids(data) as chat}
						<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href={`/gethelp/chat/${chat.chatuid}`}>
							<span class="flex flex-row" style="align-items: center; gap: 10px;">
								<img src="{avatar(chat.chatuid)}" alt="Profile" style="width: 40px; height: 40px; background: #FFFFFF; border-radius: 10px;">
								<span class="flex flex-col" style="gap: 2px;">
									<h1 style="word-break: break-word;">{chat.chatuid}</h1>
									<p class="light" style="color: var(--grey); font-size: 10px; text-transform: uppercase;">Connect</p>
								</span>
							</span>
							<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
						</a>
					{/each}
					{#if count === 0}
						<p class="light" style="color: white;">No chats available at the moment.</p>
					{/if}
				</Collection>
			</div>
		</section>
	</main>
</SignedIn>
