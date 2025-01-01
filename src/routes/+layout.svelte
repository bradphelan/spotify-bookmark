<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import {
		authSpotify,
		spotifyPlayer,
		activeDevice,
		devices,
		playbackState
	} from '$lib/stores/spotify';
	import { AppBar, AppShell, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import {
		SpotifyApi,
		type Device,
		type Devices,
		type Track as SpotifyTrack
	} from '@spotify/web-api-ts-sdk';
	import '../app.css';
	import { base } from '$app/paths';

	let interval: NodeJS.Timeout | undefined = undefined;
	onMount(async () => {
		authSpotify();
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
		interval = undefined;
	});
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
            <svelte:fragment slot="lead"><a href="{base}/tracks">All tracks</a></svelte:fragment>
            <h1 class="h1">Spotify Bookmarks</h1>
            <svelte:fragment slot="trail"><a href="https://github.com/bradphelan/spotify-bookmark">github</a></svelte:fragment>
        </AppBar>
	</svelte:fragment>

	{#if $spotifyPlayer}
		<slot />
	{:else}
		Waiting for Spotify to authenticate...
	{/if}

	<svelte:fragment slot="footer">
		<div class="footer m-1 text-center">
			{#if $activeDevice}
				<p>Active device: {$activeDevice?.name}</p>
			{:else}
				<p class="text-xl text-error-900">No active spotify device</p>
				<p>Open spotify on one of your devices and play a tune on it to activate it.</p>
			{/if}
			<p>© 2025 Brad Phelan</p>
			<p><a href="/privacy">privacy policy</a></p>
		</div>
	</svelte:fragment>
</AppShell>
