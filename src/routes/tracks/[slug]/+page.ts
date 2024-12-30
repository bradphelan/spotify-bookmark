import { findTrack } from '../../../lib/tracks.svelte'
import type { Track } from '../../../lib/tracks.svelte'

export async function load({ params }) {
    const { slug } = params;
    const track = findTrack(slug);
    if (!track) {
        return null;
    }

    return {track};
}