<script lang="ts">
	import { identicon } from '@dicebear/collection';
	import { createAvatar } from '@dicebear/core';
	import { SignedIn } from 'sveltefire';
	import { setNearestCity, getNearestCity } from '$lib/firebase';
	import toast, { Toaster } from 'svelte-french-toast';
	import { Button, Input } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	const userData = {
		nearestCity: 'Loading'
	};

	let cityName = '';

	let cityEdit = false;

	const editCity = () => {
		cityEdit = !cityEdit;
	};

	const saveCity = async (userID: string) => {
		await setNearestCity(userID, cityName);
		userData.nearestCity = cityName;
		cityEdit = false;
		toast.success('City saved successfully');
	};

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
	};

	onMount(() => {
		const notificationForm = document.getElementById('notificationForm');
		const notiSelect = document.getElementById('notiSelect');

		notificationForm.addEventListener('submit', (e) => {
			e.preventDefault();

			const formData = new FormData(notificationForm);
			if (formData.get('notifications') === 'yes') {
				document.cookie = "notifications=yes";
				console.log('Notifications enabled');
				Notification.requestPermission().then((permission) => {
					if (permission === 'granted') {
						const notification = new Notification('TEST NOTIFICATION', {
							body: 'This is what a notification looks like',
							icon: 'https://i.postimg.cc/T1b8Vb2p/logo.png'
						});
					}
				});
				window.location.reload();
			} else {
				document.cookie = "notifications=no";
				console.log('Notifications disabled');
			}
		});

		if (document.cookie.includes('notifications=yes')) {
			notiSelect.value = 'yes';
		} else {
			notiSelect.value = 'no';
		}
	});
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

	<span class="hidden">{getNearestCity(user.uid).then((city) => (userData.nearestCity = city))}</span>

	<main>

		<section class="flex flex-col" style="background: var(--whiteGrey); padding: 40px 25px 30px 25px; border-radius: 15px; align-items: center; gap: 5px;">
			<div class="flex flex-col" style="align-items: center; gap: 20px;">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img style="height: 100px; width: 100px; border-radius: 15px; border: 1px solid #808080;" src={avatar(user.uid)} alt="Profile image" />
				<h1 class="light" style="color: var(--blackGrey);">{user.displayName}</h1>
			</div>
		</section>

		<section class="flex flex-col" style="background: var(--whiteGrey); padding: 30px 25px; border-radius: 15px; align-items: center; gap: 5px;">
			<div class="flex flex-col" style="width: 100%; align-items: center; gap: 10px;">
				<h1 class="light" style="color: var(--blackGrey);">Nearest City</h1>
				<span class="flex flex-row" style="align-items: center; gap: 10px;">
					<i class="fa-solid fa-location-arrow" style="color: #1B72B5; font-size: 12px;"></i>
					<h2 class="regular" style="color: var(--blackGrey);">{userData.nearestCity}</h2>
				</span>

				<span class="flex flex-col" style="width: 100%; margin-top: 15px; gap: 10px;">
					{#if cityEdit}
						<div class="flex flex-row" style="gap: 10px;">
							<Input type="text" style="border-radius: 10px;" placeholder="Enter your nearest city" bind:value={cityName} />
							<button class="flex flex-row" style="background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;" on:click={() => saveCity(user.uid)}>
								Save
							</button>
						</div>
					{/if}
					<button on:click={editCity} class="flex flex-row" style="width: 100%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;">Edit</button>
				</span>
			</div>
		</section>

		<section class="flex flex-col" style="background: var(--whiteGrey); padding: 40px 25px 30px 25px; border-radius: 15px; align-items: center; gap: 5px;">
			<div class="flex flex-col" style="width: 100%; align-items: center; gap: 20px;">
				<h1 class="light" style="color: var(--blackGrey);">Notifications</h1>
				<p class="light" style="color: var(--blackGrey);">Would you like to receive a daily motivational notification? This can be changed at any time.</p>
				<form id="notificationForm" class="flex flex-col" style="height: auto; width: 100%; justify-content: center; gap: 10px;" method="POST">
					<select id="notiSelect" name="notifications" style="width: 100%; border-radius: 10px;">
						<option id="notiYes" value="yes">Yes</option>
						<option id="notiNo" value="no">No</option>
					</select>
					<button type="submit" class="flex flex-row" style="width: 100%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;">Save</button>
				</form>
			</div>
		</section>

	</main>
</SignedIn>
