<script lang="ts">
	import type { Track } from '$lib/tracks.svelte';
	import { bookMarkCurrentPosition, removeBookmark } from '$lib/tracks.svelte';
	import { SpotifyApi, type Device, type Devices, type Track as SpotifyTrack } from '@spotify/web-api-ts-sdk';
	let { data } = $props();
	let track: Track = data.track;

	import { onMount } from 'svelte';
	import { spotifyPlayer, isPlayerReady } from '$lib/stores/spotify';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	const seekToPosition = async (ms: number) => {
		//$spotifyPlayer.player.startResumePlayback( "", undefined, [`spotify:track:${track.id}`],  undefined, ms);
		$spotifyPlayer?.player.seekToPosition(ms);
	};

	let devices = $state<Devices>();

	let hasActiveDevice = $derived(devices?.devices.find((device:Device) => device.is_active === true));

    let trackInfo = $state<any | undefined>();

	onMount(async () => {
		devices = await $spotifyPlayer.player.getAvailableDevices();
        // set a timer to check for active device every 5 seconds
        let interval = setInterval(async () => {
            devices = await $spotifyPlayer.player.getAvailableDevices();
        }, 5000);

		try {
			await $spotifyPlayer?.player.startResumePlayback('', undefined, [`spotify:track:${track.id}`]);
		} catch (error) {
			console.error('Error starting playback:', error);
		}

        trackInfo = (await $spotifyPlayer?.tracks.get(track.id));

		return () => {
			clearInterval(interval);
		}
	});
</script>

<h1 class="h1">
    {trackInfo?.name} by {trackInfo?.artists.map((artist) => artist.name).join(', ')}
</h1>

<div class="card p-2 m-2">
	<ul>
		{#each track.times as bookmark (bookmark.time)}
			<li>
				<div class="flex items-center space-x-2 vertical-center">
					<input
						class="input w-20 rounded-none p-1 m-1"
						type="text"
						placeholder="note"
						bind:value={bookmark.name}
					/>

					<button
						type="button"
						class="btn-group variant-filled"
						onclick={() => seekToPosition(bookmark.time)}
					>
                        <span class="m-2">{(bookmark.time / 1000).toFixed(2)} ms</span>
					</button>
                    <button
                        type="button"
                        class="btn-icon bg-black variant-filled"
                        onclick={() => bookmark.time = Math.max(0, bookmark.time - 500)}
                    >
                        <span>⏪</span>
                    </button>

                    <button
                        type="button"
                        class="btn-icon bg-black variant-filled"
                        onclick={() => bookmark.time += 500}
                    >
                        <span>⏩</span>
                    </button>

					<button
						type="button"
						class="btn-icon bg-black variant-filled"
						onclick={() => removeBookmark(track, bookmark)}
					>
						<span>🗑️</span>
					</button>

				</div>
			</li>
		{:else}
			<li>No bookmarks</li>
		{/each}
	</ul>
</div>

<div class="card p-2 m-2">
	<button
		type="button"
		class="btn-base rounded-3xl m-2 variant-filled-primary"
		onclick={() => bookMarkCurrentPosition(track, $spotifyPlayer)}
		disabled={!hasActiveDevice}
		class:variant-filled-surface={hasActiveDevice}
		class:variant-filled-={!hasActiveDevice}
	>
		<span class="span">bookmark</span>
	</button>
    {#if hasActiveDevice}
        <p>Active device: {devices?.devices.find((device) => device.is_active === true)?.name}</p>
    {:else}
        <p class="text-error-900 text-xl">No active spotify device</p>
        <p>Open spotify on one of your devices and play a tune on it to activate it.</p>
    {/if}
</div>
