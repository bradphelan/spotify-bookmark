<script lang="ts">
	import type { Track } from '$lib/tracks.svelte';
	import { bookMarkCurrentPosition, removeBookmark } from '$lib/tracks.svelte';
	import { SpotifyApi, type Device, type Devices, type Track as SpotifyTrack } from '@spotify/web-api-ts-sdk';
	let { data } = $props();
	let track: Track = data.track;

	import { onMount } from 'svelte';
	import { activeDevice, spotifyPlayer} from '$lib/stores/spotify';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	const seekToPosition = async (ms: number) => {
		$spotifyPlayer?.player.seekToPosition(ms);
	};

    let trackInfo = $state<SpotifyTrack | undefined>();

	onMount(async () => {
		try {
			await $spotifyPlayer?.player.startResumePlayback('', undefined, [`spotify:track:${track.id}`]);
		} catch (error) {
			console.error('Error starting playback:', error);
		}
        trackInfo = (await $spotifyPlayer?.tracks.get(track.id));
	});
</script>

<h1 class="h2" >
	<span class="text-green-900">{trackInfo?.name}</span> 
	by 
	<span class="text-green-900">{trackInfo?.artists.map((artist) => artist.name).join(', ')}</span>
</h1>

<div class="card p-2 m-2">
	<ul>
		{#each track.times as bookmark }
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
		onclick={() => {if ($spotifyPlayer) bookMarkCurrentPosition(track, $spotifyPlayer);}}
		disabled={!$activeDevice}
		class:variant-filled-surface={$activeDevice}
	>
		<span class="span">bookmark</span>
	</button>
</div>
