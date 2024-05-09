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
			<h1 style="color: white;">E-Channeling</h1>

			<span class="flex flex-col" style="gap: 10px;">
				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://arogyahospitals.lk" target="_blank">
					<img src="https://i.postimg.cc/6QHLmtpZ/arogya.png" alt="Arogya Hospitals" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Arogya Hospitals</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://asiahospital.lk" target="_blank">
					<img src="https://i.postimg.cc/Z5HrW43Q/asiahospital.png" alt="Asia Hospitals" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Asia Hospitals</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://asirihealth.com" target="_blank">
					<img src="https://i.postimg.cc/NG27dhqy/asiri.png" alt="Asiri Health" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Asiri Health</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://www.ceymed.lk" target="_blank">
					<img src="https://i.postimg.cc/ydMRMd4D/ceymed.png" alt="Ceymed Healthcare Services" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Ceymed Healthcare Services</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://www.durdans.com" target="_blank">
					<img src="https://i.postimg.cc/L82t4nqf/durdans.png" alt="Durdans Hospitals" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Durdans Hospitals</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://hemashospitals.com" target="_blank">
					<img src="https://i.postimg.cc/MKk04sq9/hemas.png" alt="Hemas Hospitals" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Hemas Hospitals</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://jfninewells.lk" target="_blank">
					<img src="https://i.postimg.cc/fLp7MCXT/jfninewells.png" alt="Joseph Fraser Ninewells Hospitals" style="width: 100px; height: 100px; filter: invert();">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Joseph Fraser Ninewells Hospitals</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://www.lankahospitals.com" target="_blank">
					<img src="https://i.postimg.cc/d1LmMphx/lankahospitals.png" alt="Lanka Hospitals" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Lanka Hospitals</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://www.medihelp.lk" target="_blank">
					<img src="https://i.postimg.cc/ydQQc0Zw/medihelp.png" alt="Medihelp Hospitals" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Medihelp Hospitals</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://www.nawaloka.com" target="_blank">
					<img src="https://i.postimg.cc/15NCVn5j/nawaloka.png" alt="Nawaloka Hospitals" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Nawaloka Hospitals</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="http://www.nfth.lk" target="_blank">
					<img src="https://i.postimg.cc/52dPB4XN/nfth.png" alt="Dr. Neville Fernando Teaching Hospital" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Dr. Neville Fernando Teaching Hospital</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://www.ninewellshospital.lk" target="_blank">
					<img src="https://i.postimg.cc/yxDfPWhW/ninewells.png" alt="Ninewells Hospitals" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Ninewells Hospitals</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://www.philiphospitals.com" target="_blank">
					<img src="https://i.postimg.cc/44023bZc/nph.png" alt="New Philip Hospital" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">New Philip Hospital</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>

				<a class="flex flex-col" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; gap: 20px;" href="https://parkhospitals.com" target="_blank">
					<img src="https://i.postimg.cc/tJ8BmyDk/parkhospitals.png" alt="Park Hospitals" style="width: 100px; height: 100px;">
					<span class="flex flex-row" style="width: 100%; align-items: center; justify-content: space-between;">
						<h1 class="light" style="width: 85%; font-size: 14px;">Park Hospitals</h1>
						<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
					</span>
				</a>
			</span>
		</section>

	</main>
</SignedIn>
