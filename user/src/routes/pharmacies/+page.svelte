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
			<h1 style="color: white;">Pharmacies</h1>

			<div id="googleMap" style="height: calc(100vh - 220px); width: 100%; border-radius: 10px;"></div>

			<script>
				let map;
				let infowindow;

				function initMap() {
					infowindow = new google.maps.InfoWindow();

					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition((position) => {
							const location = {
								lat: position.coords.latitude,
								lng: position.coords.longitude
							};

							map = new google.maps.Map(document.getElementById('googleMap'), {
								center: location,
								zoom: 15
							});

							const service = new google.maps.places.PlacesService(map);
							service.nearbySearch({
								location: location,
								radius: 1500,
								type: ['pharmacy']
							}, callback);
						}, () => {
							handleLocationError(true, infowindow, map.getCenter());
						});
					} else {
						// Browser doesn't support Geolocation
						handleLocationError(false, infowindow, map.getCenter());
					}
				}

				function handleLocationError(browserHasGeolocation, infoWindow, pos) {
					infoWindow.setPosition(pos);
					infoWindow.setContent(browserHasGeolocation ?
						'Error: The Geolocation service failed.' :
						'Error: Your browser doesn\'t support geolocation.');
					infoWindow.open(map);
				}

				function callback(results, status) {
					if (status === google.maps.places.PlacesServiceStatus.OK) {
						for (let i = 0; i < results.length; i++) {
							createMarker(results[i]);
						}
					}
				}

				function createMarker(place) {
					const marker = new google.maps.Marker({
						map: map,
						position: place.geometry.location
					});

					google.maps.event.addListener(marker, 'click', function() {
						infowindow.setContent(place.name);
						infowindow.open(map, this);
					});
				}
			</script>

			<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDqHFruykcuj70r5oT__lYQF2dlZVW2NI&loading=async&libraries=places&callback=initMap"></script>
		</section>

	</main>
</SignedIn>
