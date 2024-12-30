<script lang="ts">
	import type { Track } from '$lib/tracks.svelte';
    import { bookMarkCurrentPosition, removeBookmark } from '$lib/tracks.svelte';
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


</script>


{#if trackInfo !== undefined}
    <h1>Track: {trackInfo.name} by {trackInfo.artists.map(artist => artist.name).join(', ')}</h1>
{:else}
    <h1>Loading track information...</h1>
{/if}

<ul>
	{#each track.times as bookmark}
        {#if $isPlayerReady}
        <div>
            <input bind:value="{bookmark.name}"><button onclick={() => seekToPosition(bookmark.time)}>Seek to {bookmark.time}</button>
            <button onclick={() => removeBookmark(track, bookmark)}>X</button>
        </div>
        {:else}
        <p>Player not ready</p>
        {/if}
	{/each}
    <div>
        <button onclick={()=>bookMarkCurrentPosition(track, $spotifyPlayer)}>Bookmark Current Position</button>
    </div>
</ul>


