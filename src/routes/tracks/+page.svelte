<script lang="ts">
	import { onMount } from 'svelte';
	import { tracks, resetTracks } from '$lib/tracks.svelte';
	import { spotifyPlayer, isPlayerReady } from '$lib/stores/spotify';

	let addingTrack = false;
</script>

<h1>Tracks</h1>
<ul>
	{#each tracks.current as track}
        {#await $spotifyPlayer?.tracks.get(track.id) then trackInfo}
            <li><a href={`/tracks/${track.id}`}>{trackInfo?.name}</a></li>
        {/await}
	{/each}
</ul>
<button on:click={() => (addingTrack = !addingTrack)}>Add Track</button>
{#if addingTrack}
	<input type="text" bind:value={tracks.newTrackName} />
	<button on:click={tracks.addTrack()}>Add</button>
{/if}

<button on:click={resetTracks()}>Reset Tracks</button>
