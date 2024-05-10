<script lang="ts">
	import { createAvatar } from '@dicebear/core';
	import { identicon } from '@dicebear/collection';
	import { SignedIn } from 'sveltefire';
	import { Card, Button, Alert } from 'flowbite-svelte';
	import { getRandomQuote } from '$lib/quotes';
	import { ArrowRightOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
	import { checkOnboardingProcess } from '$lib/firebase';

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
	};

	let onBoarding = false;

	const checkOnboarding = async (user: any) => {
		if (!user) {
			return;
		}

		const onboarding = await checkOnboardingProcess(user.uid);
		onBoarding = onboarding;
		if (!onboarding) {
			window.location.href = '/on-boarding';
		}
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

		<section class="flex" style="background: var(--accent2); border-radius: 15px; justify-content: center;">
			<div class="flex flex-col" style="width: 100%; padding: 25px; gap: 20px;">
				<h1>Quote of the day</h1>

				<div class="flex flex-col" style="gap: 15px;">
					<p class="light" id="quoteContent">Fetching...</p>
					<p class="regular italic" style="width: 100%; text-align-last: right;" id="quoteAuthor">Fetching...</p>
				</div>
			</div>

			<script>
				const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
				const targetUrl = 'https://zenquotes.io/api/today';

				function fetchQuote() {
					fetch(proxyUrl + targetUrl)
						.then(response => response.json())
						.then(data => {
							const quote = data[0].q;
							const author = data[0].a;

							const quoteContent = document.getElementById('quoteContent');
							const quoteAuthor = document.getElementById('quoteAuthor');

							quoteContent.innerHTML = quote;
							quoteAuthor.innerHTML = `- ${author}`;
						})
						.catch(error => console.error("Error fetching quote:", error));
				}

				fetchQuote();
				setTimeout(fetchQuote, 3000);
			</script>
		</section>

		<section class="flex flex-col" style="justify-content: center; gap: 20px;">
			<h1 style="color: white;">More Links</h1>

			<span class="flex flex-col" style="gap: 10px;">
				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/games">
					<h1 class="light" style="font-size: 14px;">Games</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/groupchat">
					<h1 class="light" style="font-size: 14px;">Forum</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/gethelp">
					<h1 class="light" style="font-size: 14px;">Get Help</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/status">
					<h1 class="light" style="font-size: 14px;">Status</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/speeches">
					<h1 class="light" style="font-size: 14px;">Speeches</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/pharmacies">
					<h1 class="light" style="font-size: 14px;">Pharmacies</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/echanneling">
					<h1 class="light" style="font-size: 14px;">E-Channeling</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/feedback">
					<h1 class="light" style="font-size: 14px;">Feedback</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>
			</span>
		</section>

		<div class="flex flex-col items-center justify-center gap-4 overflow-y-scroll pb-24">
			<span class="hidden"> {checkOnboarding(user)}</span>
			{#if !onBoarding}
				<Alert>
					<InfoCircleSolid slot="icon" class="h-4 w-4" />
					<span class="font-medium">Attention!</span>
					Please complete the on-boarding process for us to better understand you.
					<a href="/on-boarding" class="font-bold underline">Click Here</a>
				</Alert>
			{/if}
		</div>

	</main>
</SignedIn>
