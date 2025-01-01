<script>
    import { base } from '$app/paths';
    import { onMount } from 'svelte';

    onMount(() => {
        window.location.href = `${base}/tracks`;
    });
</script>
<h1>Welcome to Spotify Bookmarks</h1>
<a href="{base}/tracks">Tracks</a>