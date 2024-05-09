<script lang="ts">
	import { app, setOnboardingProcess } from '$lib/firebase';
	import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
	import { Card, Button, Label, Input, Select, Toggle, Range } from 'flowbite-svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { SignedIn } from 'sveltefire';
	import { createAvatar } from '@dicebear/core';
	import { identicon } from '@dicebear/collection';

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
	};

	const db = getFirestore(app);

	const answers = {
		q1: '',
		q2: '',
		q3: 1,
		q4: '',
		q5: ''
	};

	let q2t = false;
	let q4t = false;

	let reasons = [
		{ value: 'anxiety', name: 'Anxiety' },
		{ value: 'depression', name: 'Depression' },
		{ value: 'stress', name: 'Stress Management' },
		{ value: 'suicide', name: 'Suicidal Thoughts' },
		{ value: 'other', name: 'Other' }
	];

	let step = 1;

	const stepIncrement = () => {
		step += 1;
	};

	const submitOnboarding = async (user: any) => {
		if (!user) {
			toast.error('User not authenticated');
			return;
		}

		try {
			const docRef = await addDoc(collection(db, `details/${user.uid}/documents`), {
				...answers,
				createdAt: serverTimestamp()
			});
			console.log('Document written with ID: ', docRef.id);
			toast.success('Onboarding data saved successfully');
			stepIncrement(); // Proceed to the next step or finalize the onboarding
		} catch (error) {
			console.error('Error adding document: ', error);
			toast.error('Failed to save onboarding data');
		}

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

<main style="height: 100vh;">

	<section>
		{#if step == 1}
			<Card>
				<div class="flex flex-col" style="gap: 15px;">
					<h1>Onboarding</h1>
					<Label class="space-y-2">
						<p class="light">What is your primary reason for using this application?</p>
						<Select class="light" items={reasons} bind:value={answers.q1} />
					</Label>
					<button class="flex flex-row" style="width: 100%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;"
						on:click={() => {
							if (answers.q1 == '') {
								toast.error('Please Select an Option');
								return 0;
							}
							stepIncrement();
						}}>
						Next Step
					</button>
				</div>
			</Card>
		{:else if step == 2}
			<Card>
				<div class="flex flex-col" style="gap: 15px;">
					<h1>Onboarding</h1>
					<Label class="space-y-2">
						<p class="light">Have you been diagnosed with any specific mental health condition?</p>
						<Toggle class="light"
							size="large"
							on:change={() => {
								q2t = !q2t;
							}}>{q2t ? 'Yes' : 'No'}</Toggle
						>
						{#if q2t}
							<Input class="mt-2" placeholder="Please Specify" bind:value={answers.q2} />
						{/if}
					</Label>
					<button class="flex flex-row" style="width: 100%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;"
						on:click={() => {
							if (q2t && answers.q2 == '') {
								toast.error('Please Specify');
								return 0;
							}
							stepIncrement();
						}}>
						Next Step
						</button>
				</div>
			</Card>
		{:else if step == 3}
			<Card>
				<div class="flex flex-col" style="gap: 15px;">
					<h1>Onboarding</h1>
					<Label class="space-y-2">
						<p class="light">On a scale of 1-10, how would you rate the severity of your symptoms?</p>
						<p class="light" style="font-size: 12px;">1 being the least severe and 10 being the most severe</p>
						<br />
						<span class="light">{'Level: ' + answers.q3}</span>
						<Range id="range-minmax" min="1" max="10" bind:value={answers.q3} />
					</Label>
					<button class="flex flex-row" style="width: 100%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;"
						on:click={() => {
							if (q2t && answers.q2 == '') {
								toast.error('Please Specify');
								return 0;
							}
							stepIncrement();
						}}>
						Next Step
						</button>
				</div>
			</Card>
		{:else if step == 4}
			<Card>
				<div class="flex flex-col" style="gap: 15px;">
					<h1>Onboarding</h1>
					<Label class="space-y-2">
						<p class="light">Have you received any previous treatment or support for your mental health concerns?</p>
						<Toggle class="light"
							size="large"
							on:change={() => {
								q4t = !q4t;
							}}>{q4t ? 'Yes' : 'No'}</Toggle
						>
						{#if q4t}
							<Input class="mt-2" placeholder="Please Specify" bind:value={answers.q4} />
						{/if}
					</Label>
					<button class="flex flex-row" style="width: 100%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;"
						on:click={() => {
							if (q4t && answers.q4 == '') {
								toast.error('Please Specify');
								return 0;
							}
							stepIncrement();
						}}>
						Next Step
						</button>
				</div>
			</Card>
		{:else if step == 5}
			<Card>
				<div class="flex flex-col" style="gap: 15px;">
					<h1>Onboarding</h1>
					<Label class="space-y-2">
						<p class="light">Is there any additional information you would like to provide that could help us better understand your needs and tailor the support accordingly?</p>
						<Input type="text" class="light" bind:value={answers.q5} />
					</Label>
					<button class="flex flex-row" style="width: 100%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;"
						on:click={() => {
							if (answers.q5 == '') {
								toast.error('Please Specify');
								return 0;
							}
							stepIncrement();
						}}>
						Next Step
						</button>
				</div>
			</Card>
		{:else}
			<Card>
				<div class="flex flex-col" style="gap: 15px;">
					<h1>Onboarding</h1>
					<Label class="space-y-2">
						<p class="light">Thank you for completing the onboarding process</p>
					</Label>
					<button class="flex flex-row" style="width: 100%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;"
						on:click={() => {
							setOnboardingProcess(user.uid);
							submitOnboarding(user);
						}}>
						Submit
						</button>
				</div>
			</Card>
		{/if}
	</section>

</main>
</SignedIn>