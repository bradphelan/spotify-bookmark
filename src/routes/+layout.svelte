<script>
	import { onMount } from 'svelte';
	import { authSpotify,  spotifyPlayer, isPlayerReady } from '$lib/stores/spotify';
    onMount(() => {
        authSpotify();
    });
</script>
<style>
    .nav {
        display: flex;
        justify-content: left;
        list-style-type: none;
        padding: 0;
    }
    .nav li {
        margin: 0 1rem;
    }

    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
    }

</style>
<h1>Spotify Bookmarks</h1>

<ul class="nav">
    <li><a href="/tracks">tracks</a></li>
</ul>
{#if $spotifyPlayer}
	<slot />
{:else}
    Waiting for Spotify to authenticate...
{/if}

<div class="footer">
    <p>© 2025 Brad Phelan</p>
    <p><a href="/privacy">privacy policy</a></p>
</div>
