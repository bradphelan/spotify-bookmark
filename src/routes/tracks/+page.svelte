<script lang="ts">
	import { onMount } from 'svelte';
	import { tracks, resetTracks, addTrackUri, removeTrack } from '$lib/tracks.svelte';
	import { playbackState, spotifyPlayer, currentTrack} from '$lib/stores/spotify';
	import type { PlaybackState } from '@spotify/web-api-ts-sdk';
	import { base } from '$app/paths';


	let addTrack = async () => {
		if ($currentTrack && $spotifyPlayer) await addTrackUri($spotifyPlayer, currentTrack?.item.href);
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

{#if $currentTrack}
	<h3 class="h3">Currently playing track
		<br/>
	<span class="text-green-900">{$currentTrack?.name}</span> 
	by 
	<span class="text-green-900">{$currentTrack?.artists.map((artist) => artist.name).join(', ')}</span>
	</h3>
	<button class="btn-base variant-filled-primary" onclick={addTrack}>Add Track</button>
{/if}
<button class="btn-base variant-filled-secondary" onclick={() => resetTracks()}>Reset Tracks</button>
