<script>
	import { onMount } from 'svelte';
	import { authSpotify,  spotifyPlayer, isPlayerReady } from '$lib/stores/spotify';
    import { AppBar, AppShell, TabAnchor, TabGroup} from '@skeletonlabs/skeleton';
    import "../app.css"
	import { base } from '$app/paths';
    onMount(() => {
        authSpotify();
    });
</script>
<AppShell>

<svelte:fragment slot="header">
    <AppBar>Spotify Bookmarks</AppBar>
    <TabGroup
        justify="justify-center"
        active="variant-filled-primary"
        hover="hover:variant-soft-primary"
        flex="flex-1 lg:flex-none"
        rounded=""
        border=""
        class="bg-surface-100-800-token w-full"
    >
        <TabAnchor href="{base}/tracks">Tracks</TabAnchor>
    </TabGroup>
</svelte:fragment>

{#if $spotifyPlayer}
	<slot />
{:else}
    Waiting for Spotify to authenticate...
{/if}

<svelte:fragment slot="footer">
    <div class="footer">
        <p>© 2025 Brad Phelan</p>
        <p><a href="/privacy">privacy policy</a></p>
    </div>
</svelte:fragment>
</AppShell>
