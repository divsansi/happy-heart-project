<script lang="ts">
    import { createAvatar } from '@dicebear/core';
	import { identicon } from '@dicebear/collection';
	import { SignedIn } from 'sveltefire';
	import { Card, Button, Alert } from 'flowbite-svelte';
	import { getRandomQuote } from '$lib/quotes';
	import { ArrowRightOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
	import { checkOnboardingProcess } from '$lib/firebase';
	import { onMount } from 'svelte';

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
	};

	onMount(() => {
		const helpForm = document.getElementById("helpForm");
		const formMsgStatus = document.getElementById("formMsgStatus");

		helpForm.addEventListener("submit", function (e) {
			e.preventDefault();
			const form = e.target;

			// submit form data
			const data = new FormData(form);
			const action = e.target.action;

			formMsgStatus.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin" style="font-size: 10px;"></i> Please wait!';

			fetch(action, {
				method: "POST",
				body: data,
			})
			.then(() => {
				helpForm.reset();
				formMsgStatus.innerHTML = '<i class="fa-solid fa-circle-check" style="font-size: 10px;"></i> Your message has been sent!';
				setTimeout(() => {
					formMsgStatus.innerHTML = "";
				}, 3000);
			})
			.catch(() => {
				formMsgStatus.innerHTML = '<i class="fa-solid fa-circle-xmark" style="font-size: 10px;"></i> Something went wrong. Please try again!';
				setTimeout(() => {
					formMsgStatus.innerHTML = "";
				}, 3000);
			});
		});
	});
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

		<section class="flex flex-col" style="background: var(--accent2); padding: 25px; border-radius: 15px; align-items: flex-start; gap: 15px;">
			<h1>Help / Feedback</h1>

			<form id="helpForm" class="flex flex-col" style="gap: 20px;" method="POST" action="https://script.google.com/macros/s/AKfycbz_7PCiIqiNuA8IA8JzCdiKs8v6kDa14Kt-m8XuWzCSvroFgDps7ODj_gpCRCKkfprM/exec">
				<p class="light">We are here to help you. Please fill out the form below and we will get back to you as soon as possible.</p>

				<div class="flex flex-col" style="gap: 10px;">
					<input type="text" style="border-radius: 10px;" name="Name" id="username" placeholder="Name" value="{user.displayName}" required />

					<input type="email" style="border-radius: 10px;" name="Email" id="useremail" placeholder="Email" required />

					<select id="formtype" name="Subject">
						<option value="Help" selected>Help</option>
						<option value="Feedback">Feedback</option>
					</select>

					<textarea name="Message" placeholder="Message" style="height: 150px;" required></textarea>
				</div>

				<button type="submit" style="background: #1B72B5;">Submit</button>
				<span id="formMsgStatus" class="flex flex-row light" style="width: 100%; color: var(--accent); font-size: 12px; text-transform: uppercase; align-items: center; justify-content: center; gap: 10px;"></span>

				<p class="light" id="loginLink" style="width: 100%; color: var(--grey); text-transform: uppercase; font-size: 12px; text-align-last: center; padding-bottom: 20px;">
					Existing User? <a href="/login" class="regular" style="color: var(--accent);">Login</a>
				</p>
			</form>
		</section>

	</main>
</SignedIn>
