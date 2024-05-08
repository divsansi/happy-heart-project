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
				<h6 class="text-xl font-bold font-medium text-gray-900 dark:text-white" onclick="window.location.href='/games'">The Cube</h6>
				<div class="flex w-full flex-col items-center gap-2">

					<div class="flex w-full flex-col gap-4 rounded-lg border p-4 shadow-sm backdrop-blur-md">
						<span style="height: 70vh; width: 100%; background: var(--whiteGrey); border-radius: 10px;">
							<iframe style="height: 100%; width: 100%; border-radius: 10px;" src="https://happy-heart-games.onrender.com/TheCube/index.html" title="Game" frameborder="0"></iframe>
						</span>
					</div>

				</div>
			</div>
		</div>
	</div>
</SignedIn>
