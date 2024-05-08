<script lang="ts">
	import { SignedIn, User } from 'sveltefire';
</script>

<SignedIn let:user>
	<div
		class="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 overflow-y-scroll pb-24"
	>
		<!-- Welcome Card -->

		<div class="flex w-full flex-col items-center gap-4 p-4">
			<div class="flex w-full flex-col items-center gap-2">
				<h6 class="text-xl font-bold font-medium text-gray-900 dark:text-white">Pharmacies</h6>
				<div class="flex w-full flex-col items-center gap-2">

					<div class="flex w-full flex-col gap-4 rounded-lg border p-4 shadow-sm backdrop-blur-md">
						<span style="height: 70vh; width: 100%; background: var(--whiteGrey); border-radius: 10px;">
							<div id="googleMap" style="height: 100%; width: 100%; border: 1.5px solid var(--accent); border-radius: 10px;"></div>

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
												radius: 1000,
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
						</span>
					</div>

				</div>
			</div>
		</div>
	</div>
</SignedIn>
