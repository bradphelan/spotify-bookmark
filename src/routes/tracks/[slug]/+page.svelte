<script lang="ts">
	import type { Track } from '$lib/tracks.svelte';
	let { data } = $props();
	let track:Track = data.track;

	import { onMount } from 'svelte';
	import { spotifyPlayer, isPlayerReady } from '$lib/stores/spotify';

	const seekToPosition = async (ms:number) => {
        $spotifyPlayer.player.startResumePlayback( "", undefined, [`spotify:track:${track.id}`],  undefined, ms);
	};

</script>

<h1>Track: {track.id}: {track.name}</h1>

<ul>
	{#each track.times as time}
        {#if $isPlayerReady}
        <div>
            <button onclick={() => seekToPosition(time)}>Seek to {time}</button>
        </div>
        {:else}
        <p>Player not ready</p>
        {/if}
	{/each}
</ul>


