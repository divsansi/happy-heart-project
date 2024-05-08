<script lang="ts">
	import { identicon } from '@dicebear/collection';
	import { createAvatar } from '@dicebear/core';
	import { SignedIn } from 'sveltefire';
	import { setNearestCity, getNearestCity } from '$lib/firebase';
	import toast, { Toaster } from 'svelte-french-toast';
	import { Button, Input } from 'flowbite-svelte';

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
</script>

<Toaster />
<SignedIn let:user>
	<span class="hidden"
		>{getNearestCity(user.uid).then((city) => (userData.nearestCity = city))}</span
	>
	<div class="flex flex-col items-center justify-center gap-4 overflow-y-scroll pb-24">
		<!-- Welcome Card -->
		<div
			class="w-full max-w-sm rounded-lg shadow backdrop-blur-md dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="flex flex-col items-center pb-10 pt-10">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="mb-3 h-24 w-24 rounded-full shadow-lg"
					src={avatar(user.uid)}
					alt="Profile image"
				/>
				<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.displayName}</h5>
			</div>
		</div>

		<!-- Profile Information Card ( Nearest City ) -->
		<div
			class="w-full max-w-sm rounded-lg border shadow backdrop-blur-md dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="flex flex-col items-center pb-10 pt-10">
				<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Nearest City</h5>
				<span class="text-sm text-white">{userData.nearestCity}</span>
				{#if cityEdit}
					<div class="mt-4 flex md:mt-6">
						<Input
							type="text"
							class="rounded-lgpx-4 py-2 text-sm font-medium text-gray-900 backdrop-blur-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
							placeholder="Enter your nearest city"
							bind:value={cityName}
						/>
						<Button
							color="light"
							class="rounded-lgpx-4 ms-2 bg-white py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
							on:click={() => saveCity(user.uid)}
						>
							Save
						</Button>
					</div>
				{/if}
				<div class="mt-4 flex md:mt-6">
					<Button
						color="light"
						on:click={editCity}
						class="rounded-lgpx-4 ms-2 bg-white py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
						>Edit</Button
					>
				</div>
			</div>
		</div>
	</div>
</SignedIn>
