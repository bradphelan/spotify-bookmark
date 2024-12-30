import { LocalStorage } from "./storage.svelte";

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

export const resetTracks = () => {
    // Fill tracks with lorem ipsum data
    tracks.current = [
        {
            id: "43cCZRdT1nybOMWrjimFWB",
            name: "Stay",
            times: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
        },
        {
            id: "60lMbWaSNuUhwYxG0atyC3",
            name: "Enjoy the ride",
            times: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
        },
        {
            id: "5iufhaKI3OSxCDj86dJGK5",
            name: "Calentura",
            times: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
        }
    ];
}


