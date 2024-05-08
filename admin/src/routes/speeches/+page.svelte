<script lang="ts">
	import { Card, Label, Input, Button, Textarea } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { addSpeech, getSpeeches } from '$lib/firebase';
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

	const add = async () => {
		if (!videoData.title || !videoData.link) {
			toast.error('Please fill in all fields');
			return;
		}
		await addSpeech(videoData.title, videoData.link, videoData.description);
		videoData.title = '';
		videoData.link = '';
		videoData.description = '';

		toast.success('Speech added successfully');

		const speeches = await getSpeeches();
		data.speeches = speeches;
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
	<Card>
		<h5 class="mb-2 text-center text-xl font-bold tracking-tight text-gray-900">Add new Speech</h5>
		<Input type="text" id="title*" placeholder="Title" class="mb-4" bind:value={videoData.title} />
		<Input type="text" id="link*" placeholder="Link" class="mb-4" bind:value={videoData.link} />
		<Textarea
			id="description"
			placeholder="Description"
			class="mb-4"
			bind:value={videoData.description}
		/>
		<Button class="w-full" on:click={add}>Add</Button>
	</Card>

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
