<script>
	import { onMount } from 'svelte';
	import { authSpotify,  spotifyPlayer, isPlayerReady } from '$lib/stores/spotify';
    authSpotify();
</script>

{#if $spotifyPlayer}
	<slot />
{:else}
    Waiting for Spotify to authenticate...
{/if}
