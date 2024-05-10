<script>
	import { Section, Page404 } from 'flowbite-svelte-blocks';
	import { Button } from 'flowbite-svelte';
</script>

<section id="topBar" class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between; padding: 25px; margin-bottom: -20px; background: transparent; position: sticky; top: 0; backdrop-filter: blur(25px);">
	<img class="topbarLogo" src="https://i.postimg.cc/sgx3L1gg/logotext-2.png" alt="Logo">

	<div class="userpfp" style="visibility: hidden;">
		<!-- <img src="{avatar(user.uid)}" alt="Profile"> -->
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

	<section class="flex flex-col" style="height: calc(100vh - 220px); width: 100%; align-items: center; justify-content: center; gap: 20px;">
		<img src="https://i.postimg.cc/tT5TKPmS/404.png" style="height: 250px; margin-bottom: -20px;" alt="404 Logo">
		<h1 class="medium" style="color: white;">Page Not Found</h1>
		<p class="light" style="color: white;">Seems like you're lost, but don't worry, it's okay. Maybe try going back to the homepage?</p>
		<a class="flex flex-row" style="width: 100%; background: #1B72B5; color: #FFFFFF; text-transform: uppercase; padding: 10px; font-size: 12px; border: none; border-radius: 10px; align-items: center; justify-content: center; gap: 10px; cursor: pointer;" href="/">Back to Homepage</a>
	</section>

</main>