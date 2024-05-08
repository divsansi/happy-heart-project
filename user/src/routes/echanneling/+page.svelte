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
			<h1 style="color: white;">E-Channeling Services</h1>

			<span class="flex flex-col" style="gap: 10px;">
				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.doc.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Doc990</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.echannelling.com" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">eChannelling</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>
			</span>
		</section>

        <section class="flex flex-col" style="justify-content: center; gap: 20px;">
			<h1 style="color: white;">E-Channeling Hospitals</h1>

			<span class="flex flex-col" style="gap: 10px;">
				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://winsethahospitals.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Winsetha Hospitals</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.medihelp.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Medihelp Hospitals</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://asirihealth.com" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Asiri Health</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://asiahospital.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Asia Hospital</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://santadorahospital.com" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Santa Dora Hospital</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="http://www.nfth.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Dr. Neville Fernando Teaching Hospital</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.philiphospitals.com" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Philip Hospitals</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://jfninewells.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Joseph Fraser Ninewells</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.nawinna.com" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Nawinna Medicare Hospitals</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.ceylincocancercentre.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Ceylinco Cancer Center</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://arogyahospitals.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Arogya Hospitals</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.ninewellshospital.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Ninewells Hospitals</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.goldenkeyhospitals.com" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Golden Key Hospitals</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.kingshospital.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Kings Hospital</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.lankahospitals.com" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Lanka Hospitals</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://healthylife.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Healthy Life Clinic</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://hemashospitals.com" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Hemas Hospitals</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.ceymed.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Ceymed Healthcare Services</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://parkhospitals.com" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Park Hospitals</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.westernhospital.lk" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Western Hospital</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.durdans.com" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Durdans Hospital</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>

				<a class="flex flex-row" style="background: var(--accent2); padding: 20px 25px; border-radius: 15px; align-items: center; justify-content: space-between;" href="https://www.nawaloka.com" target="_blank">
					<h1 class="light" style="width: 85%; font-size: 14px;">Nawaloka Hospitals</h1>
					<i class="fa-solid fa-chevron-right" style="color: var(--accent); font-size: 10px;"></i>
				</a>
			</span>
		</section>

	</main>
</SignedIn>
