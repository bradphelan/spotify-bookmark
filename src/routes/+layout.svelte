<script>
	import { onMount } from 'svelte';
	import { authSpotify, spotifyPlayer, isPlayerReady } from '$lib/stores/spotify';

	const clientId = 'b6e8a090fcd3474ea29f034b6d3bf81c';
	const redirectUri = 'http://localhost:5173';
	const authEndpoint = 'https://accounts.spotify.com/authorize';

	export let authToken = "";
	onMount(() => {
        authSpotify();
	});



</script>

{#if $isPlayerReady}
	<p>Authentication successful! Token acquired.</p>
    <button on:click={() => {
        authToken = "";
        window.location.replace(`${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token`);
    }}>
        Re-login to Spotify
    </button>
    {authToken}
	<slot />
{:else}
	<p>Redirecting to Spotify for authentication...</p>
{/if}

