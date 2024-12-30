<script lang="ts">
  import { onMount } from 'svelte';
  import { tracks, resetTracks } from '$lib/tracks.svelte'


</script>
<h1>Tracks</h1>
<ul>
    {#each tracks.current as track}
        <li><a href={`/tracks/${track.id}`}>{track.name}</a></li>
    {/each}
</ul>

<button on:click={resetTracks()}>Reset Tracks</button>
