import { LocalStorage } from "./storage.svelte";
import { spotifyPlayer, isPlayerReady } from '$lib/stores/spotify';
import type { SpotifyApi } from "@spotify/web-api-ts-sdk";

export interface Track {
  id: string; // guid
  name: string;
  times: number[];
}


export const tracks = new LocalStorage<Track[]>("tracks", []);

export const addTrack = (track: Track) => {
  tracks.current.push(track);
};

export const findTrack = (id: string) => {
    return tracks.current.find((track) => track.id === id);
}

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
            name: "Stay",
            times: [].map((time) => time * 1000)
        },
        {
            id: "60lMbWaSNuUhwYxG0atyC3",
            name: "Enjoy the ride",
            times: [].map((time) => time * 1000)
        },
        {
            id: "5iufhaKI3OSxCDj86dJGK5",
            name: "Calentura",
            times: [].map((time) => time * 1000)
        }
    ];
}


