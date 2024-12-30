<script lang="ts">
	import { onMount } from 'svelte';
	import { tracks, resetTracks, addTrackUri } from '$lib/tracks.svelte';
	import { spotifyPlayer, isPlayerReady } from '$lib/stores/spotify';

	let addingTrack = false;
    let addingTrackUrl = '';

    let addTrack = async (url:string) => {
        await addTrackUri($spotifyPlayer, url);
        addingTrack = false;
    };
</script>

<h1>Tracks</h1>
<ul>
	{#each tracks.current as track}
        {#await $spotifyPlayer?.tracks.get(track.id) then trackInfo}
            <li><a href={`/tracks/${track.id}`}>{trackInfo?.name}</a></li>
        {/await}
	{/each}
</ul>
{#if addingTrack}
    <input type="text" placeholder="https://open.spotify.com/track/3nIkYXtATtMlRaJsn8Ijh9?si=f61b2c1bfb4a4831" bind:value={addingTrackUrl} style="width:100%" />
	<button onclick={()=>addTrack(addingTrackUrl)}>Add</button>
    <p>Simply select a spotify track within the main spotify app and share the URI to clipboard. Then paste it here</p>
{:else}
    <button onclick={() => (addingTrack = !addingTrack)}>Add Track</button>
    <button onclick={()=>resetTracks()}>Reset Tracks</button>
{/if}

