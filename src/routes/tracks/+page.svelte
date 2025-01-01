<script lang="ts">
	import { onMount } from 'svelte';
	import { tracks, resetTracks, addTrackUri, removeTrack } from '$lib/tracks.svelte';
	import { spotifyPlayer} from '$lib/stores/spotify';
	import type { PlaybackState } from '@spotify/web-api-ts-sdk';
	import { base } from '$app/paths';

	let currentTrack = $state<PlaybackState | undefined>();

	onMount(() => {
		let intervalId: NodeJS.Timeout;

		const pollCurrentTrack = async () => {
			currentTrack = (await $spotifyPlayer?.player.getCurrentlyPlayingTrack());
		};

		intervalId = setInterval(pollCurrentTrack, 2000);

		return () => {
			clearInterval(intervalId);
		};
	});

	let addTrack = async () => {
		if (currentTrack && $spotifyPlayer) await addTrackUri($spotifyPlayer, currentTrack?.item.href);
	};
</script>

<div style="padding: 1rem; border: 1px solid #ccc; background-color: #f9f9f9;">
	<ul class="list">
		{#each tracks.current as track}
				<li class="list-item">
			{#await $spotifyPlayer?.tracks.get(track.id) then trackInfo}
					<span><a class="flex-auto" href="{base}/tracks/{track.id}">{trackInfo?.name}</a></span>
			{/await}

            <button
                type="button"
                class="btn-icon bg-black variant-filled"
                onclick={() => confirm("Are you sure?") && removeTrack(track)}
            >
            <span>🗑️</span>
            </button>
            </li>
		{/each}
	</ul>
</div>

{#if currentTrack}
	<button class="btn-base" onclick={addTrack}>Add Track</button>
{/if}
<button class="btn-base" onclick={() => resetTracks()}>Reset Tracks</button>
