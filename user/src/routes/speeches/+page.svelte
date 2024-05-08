<script lang="ts">
	import { Card, Label, Input, Button, Textarea } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import toast, { Toaster } from 'svelte-french-toast';
	import type { Speech } from '$lib/firebase';

	export let data: {
		speeches: Speech[];
	};

	const videoData = {
		title: '',
		link: '',
		description: ''
	};

	const getThumb = (url: string, size: string) => {
		if (url === null) {
			return '';
		}
		const asize = size === null ? 'big' : size;
		const results = url.match('[\\?&]v=([^&#]*)');
		const video = results === null ? url : results[1];

		if (asize === 'small') {
			return `http://img.youtube.com/vi/${video}/2.jpg`;
		}
		return `http://img.youtube.com/vi/${video}/0.jpg`;
	};
</script>

<Toaster />
<!-- Card to add a youtube Video (Title, Link) -->
<div class="flex w-full flex-col items-center gap-4 p-4 pb-32">
	{#each data.speeches as speech}
		<Card img={getThumb(speech.link, 'big')}>
			<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
				{speech.title}
			</h5>
			<p class="mb-3 text-sm font-normal leading-tight text-gray-700 dark:text-gray-400">
				{speech.description}
			</p>
			<a href={speech.link}>
				<Button>
					View Video <ArrowRightOutline class="ms-2 h-6 w-6 text-white" />
				</Button></a
			>
		</Card>
	{/each}
</div>
