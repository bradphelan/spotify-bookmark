import { LocalStorage } from "./storage.svelte";
import { spotifyPlayer, isPlayerReady } from '$lib/stores/spotify';
import type { SpotifyApi } from "@spotify/web-api-ts-sdk";

export interface Bookmark {
    time: number;
    name: string;
}

export interface Track {
  id: string; // guid
  times: Bookmark[];
}

export const tracks = new LocalStorage<Track[]>("tracks", []);

export const addTrack = (track: Track) => {
  tracks.current.push(track);
};

export const findTrack = (id: string) => {
    return tracks.current.find((track) => track.id === id);
}

export const bookMarkCurrentPosition = async (track:Track, api: SpotifyApi) => {
    const state = await api.player.getPlaybackState();
    if(state===undefined) return;
    track.times.push({time:state.progress_ms, name:""});
    track.times.sort((a, b) => a.time - b.time);
};

export const removeBookmark = async (t:Track, m:Bookmark) => {
    if (confirm('Are you sure you want to remove this bookmark?')) {
        t.times = t.times.filter(c=> c.time !== m.time);
    }
};

/// Adds a track to the list of tracks
/// The format of the track is as follows:
/// https://open.spotify.com/track/3nIkYXtATtMlRaJsn8Ijh9?si=2921dc125c6f4d3a
/// The actual id is '3nIkYXtATtMlRaJsn8Ijh9' and needs to be extracted
export const addTrackUri = async (player:SpotifyApi, trackURI: string) => {
    let id = trackURI.split("/").pop();
    if (id) {
        let track = await player.tracks.get(id);
        if (track) {
            tracks.current.push({
                id: track.id,
                times: []
            });
        }
    }
}

export const resetTracks = () => {
    // Fill tracks with lorem ipsum data
    tracks.current = [
        {
            id: "43cCZRdT1nybOMWrjimFWB",
            times: []
        },
        {
            id: "60lMbWaSNuUhwYxG0atyC3",
            times: []
        },
        {
            id: "5iufhaKI3OSxCDj86dJGK5",
            times: []
        }
    ];
}


