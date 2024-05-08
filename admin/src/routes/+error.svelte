<script>
	import { Section, Page404 } from 'flowbite-svelte-blocks';
	import { Button } from 'flowbite-svelte';
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<Section name="page404">
		<Page404>
			<svelte:fragment slot="h1">Woops</svelte:fragment>
			<svelte:fragment slot="paragraph">
				<p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
					Something's Went Wrong.
				</p>
				<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
					Sorry, we can't find that page. You'll find lots to explore on the home page.
				</p>
				<Button href="/" size="lg" color="red">Back to Homepage</Button>
			</svelte:fragment>
		</Page404>
	</Section>
</div>
