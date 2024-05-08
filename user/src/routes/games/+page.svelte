<script lang="ts">
	import { createAvatar } from '@dicebear/core';
	import { identicon } from '@dicebear/collection';
	import { SignedIn } from 'sveltefire';

	const avatar = (uid: string) => {
		const av = createAvatar(identicon, { seed: uid, backgroundType: ['solid'] });
		return av.toDataUriSync();
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

		<section class="flex flex-col" style="justify-content: center; gap: 20px;">
			<h1 style="color: white;">Games</h1>

			<span class="flex flex-col" style="gap: 10px;">
				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/games/memorygame">
					<h1 class="light" style="font-size: 14px;">Memory Game</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/games/rockpaperscissors">
					<h1 class="light" style="font-size: 14px;">Rock Paper Scissors</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/games/snakesandladders">
					<h1 class="light" style="font-size: 14px;">Snakes and Ladders</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/games/thecube">
					<h1 class="light" style="font-size: 14px;">The Cube</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="/games/towerblocks">
					<h1 class="light" style="font-size: 14px;">Tower Blocks</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>
			</span>
		</section>

	</main>
</SignedIn>
