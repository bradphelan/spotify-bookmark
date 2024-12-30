<script lang="ts">
	import type { Track } from '$lib/tracks.svelte';
    import { SpotifyApi, type Track as SpotifyTrack } from '@spotify/web-api-ts-sdk'
	let { data } = $props();
	let track:Track = data.track;
    let trackInfo:(SpotifyTrack|undefined) = $state();

	import { onMount } from 'svelte';
	import { spotifyPlayer, isPlayerReady } from '$lib/stores/spotify';

	const seekToPosition = async (ms:number) => {
        //$spotifyPlayer.player.startResumePlayback( "", undefined, [`spotify:track:${track.id}`],  undefined, ms);
        $spotifyPlayer?.player.seekToPosition(ms);
	};

    onMount(async () => {
        await $spotifyPlayer?.player.startResumePlayback( "", undefined, [`spotify:track:${track.id}`]);
        trackInfo = await $spotifyPlayer?.tracks.get(track.id);
    });

    const bookMarkCurrentPosition = async () => {
        const state = await $spotifyPlayer?.player.getPlaybackState();
        if(state===undefined) return;
        track.times.push(state.progress_ms);
        track.times.sort((a, b) => a - b);
    };

    const removeBookmark = async (time:number) => {
        if (confirm('Are you sure you want to remove this bookmark?')) {
            track.times = track.times.filter(t => t !== time);
        }
    };

</script>


{#if trackInfo !== undefined}
    <h1>Track: {trackInfo.name} by {trackInfo.artists.map(artist => artist.name).join(', ')}</h1>
{:else}
    <h1>Loading track information...</h1>
{/if}

<ul>
	{#each track.times as time}
        {#if $isPlayerReady}
        <div>
            <button onclick={() => seekToPosition(time)}>Seek to {time}</button>
            <button onclick={() => removeBookmark(time)}>X</button>
        </div>
        {:else}
        <p>Player not ready</p>
        {/if}
	{/each}
    <div>
        <button onclick={bookMarkCurrentPosition}>Bookmark Current Position</button>
    </div>
</ul>


