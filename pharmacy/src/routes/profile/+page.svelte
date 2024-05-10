<script lang="ts">
	import { identicon } from '@dicebear/collection';
	import { createAvatar } from '@dicebear/core';
	import { SignedIn } from 'sveltefire';
	import toast, { Toaster } from 'svelte-french-toast';
	import { addPharmacyDetails, getPharmacyDetails } from '$lib/firebase';
	import { Button, Input } from 'flowbite-svelte';

	const userData = {
		city: 'Loading',
		name: 'Loading'
	};

	let pharmacyName = '';
	let pharmacyCity = '';

	let cityEdit = false;

	const editCity = () => {
		cityEdit = !cityEdit;
	};

	const saveData = async (uid: string) => {
		await addPharmacyDetails(uid, pharmacyName, pharmacyCity);
		userData.city = pharmacyCity;
		userData.name = pharmacyName;
		cityEdit = false;
		toast.success('City saved successfully');
	};

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
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

		<section class="flex flex-col" style="background: var(--whiteGrey); padding: 40px 25px 30px 25px; border-radius: 15px; align-items: center; gap: 5px;">
			<div class="flex flex-col" style="align-items: center; gap: 20px;">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img style="height: 100px; width: 100px; border-radius: 15px; border: 1px solid #808080;" src={avatar(user.uid)} alt="Profile image" />
				<span class="flex flex-col" style="width: 100%; align-items: center;">
					<h1 class="light" style="color: var(--blackGrey);">{user.displayName}</h1>
					<p class="light" style="color: var(--grey); text-transform: uppercase;">Pharmacy</p>
				</span>
			</div>
		</section>

	</main>
</SignedIn>
