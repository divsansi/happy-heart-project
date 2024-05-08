<script lang="ts">
	import { getPrescriptions, getPharmacyDetails } from '$lib/firebase';
	import { SignedIn, User } from 'sveltefire';

	export let data;
</script>

<SignedIn let:user>
	<div
		class="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 overflow-y-scroll pb-24"
	>
		<!-- Welcome Card -->

		<div class="flex w-full flex-col items-center gap-4 p-4">
			<div class="flex w-full flex-col items-center gap-2">
				<h6 class="text-xl font-bold font-medium text-gray-900 dark:text-white">Prescriptions</h6>
				<div class="flex w-full flex-col items-center gap-2">
					{#each data.presData as prescription}
						<div
							class="flex w-full flex-col gap-4 rounded-lg border p-4 shadow-sm backdrop-blur-md"
						>
							<div class="flex w-full flex-row items-center justify-between gap-4">
								<h2 class="text-wrap text-xs font-semibold">Prescription Collection Notice</h2>
							</div>
							<div class="flex w-full flex-row items-center justify-between gap-4">
								<div>
									<p class="text-white">
										{prescription.pharmacy.name} - {prescription.pharmacy.city}
									</p>
									<p class="text-white">{prescription.text}</p>
								</div>
							</div>
						</div>
					{/each}
					{#if data.presData.length === 0}
						<p>No prescriptions available at the moment.</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</SignedIn>
