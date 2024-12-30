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

<div style="padding: 1rem; border: 1px solid #ccc; background-color: #f9f9f9;">
    <ul class="list">
        {#each tracks.current as track}
            {#await $spotifyPlayer?.tracks.get(track.id) then trackInfo}
                <li class="list-item">
                    <span><a class="flex-auto" href={`/tracks/${track.id}`}>{trackInfo?.name}</a></span>
                </li>
            {/await}
        {/each}
    </ul>
</div>
{#if addingTrack}
    <input class="input-md" type="text" placeholder="https://open.spotify.com/track/3nIkYXtATtMlRaJsn8Ijh9?si=f61b2c1bfb4a4831" bind:value={addingTrackUrl} style="width:100%" />
	<button 
        class="btn-md variant-filled"
        onclick={()=>addTrack(addingTrackUrl)}>
        <span>Add</span>
    </button>
    <p>Simply select a spotify track within the main spotify app and share the URI to clipboard. Then paste it here</p>
{:else}
    <button class="btn-base" onclick={() => (addingTrack = !addingTrack)}>Add Track</button>
    <button class="btn-base" onclick={()=>resetTracks()}>Reset Tracks</button>
{/if}

