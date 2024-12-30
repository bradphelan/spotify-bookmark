<script lang="ts">
	import type { Track } from '$lib/tracks.svelte';
	import { bookMarkCurrentPosition, removeBookmark } from '$lib/tracks.svelte';
	import { SpotifyApi, type Track as SpotifyTrack } from '@spotify/web-api-ts-sdk';
	let { data } = $props();
	let track: Track = data.track;
	let trackInfo: SpotifyTrack | undefined = $state();

	import { onMount } from 'svelte';
	import { spotifyPlayer, isPlayerReady } from '$lib/stores/spotify';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	const seekToPosition = async (ms: number) => {
		//$spotifyPlayer.player.startResumePlayback( "", undefined, [`spotify:track:${track.id}`],  undefined, ms);
		$spotifyPlayer?.player.seekToPosition(ms);
	};

	let devices = $state<Devices>();

	let hasActiveDevice = $derived(devices?.devices.find((device) => device.is_active === true));

	onMount(async () => {
		devices = await $spotifyPlayer.player.getAvailableDevices();
		await $spotifyPlayer?.player.startResumePlayback('', undefined, [`spotify:track:${track.id}`]);
	});
</script>

{#await $spotifyPlayer?.tracks.get(track.id) then trackInfo}
	<h1 class="h1">
		Track: {trackInfo.name} by {trackInfo.artists.map((artist) => artist.name).join(', ')}
	</h1>
{/await}

<div class="content-center">
	<ul>
		{#each track.times as bookmark}
			<li>
				<div class="flex items-center space-x-2 vertical-center">
					<input
						class="input w-20 rounded-none"
						type="text"
						placeholder="note"
						bind:value={bookmark.name}
					/>

					<button
						type="button"
						class="btn-icon variant-filled"
						onclick={() => seekToPosition(bookmark.time)}
					>
						<span>{bookmark.time}</span>
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
		{/each}
	</ul>
</div>
<div>
	<button
		type="button"
		class="btn-base rounded-3xl variant-filled-primary"
		onclick={() => bookMarkCurrentPosition(track, $spotifyPlayer)}
	>
    <span>bookmark</span>
	</button>
    {#if hasActiveDevice}
        <p>Active device: {devices?.devices.find((device) => device.is_active === true)?.name}</p>
    {:else}
        <p>No active device</p>
    {/if}
</div>
