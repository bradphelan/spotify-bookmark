import { writable, derived, readable, type Readable } from 'svelte/store';
import { SpotifyApi, type AccessToken, type Device, type Devices, type PlaybackState, type Track as TrackInfo} from '@spotify/web-api-ts-sdk';
const mode = import.meta.env.MODE;

export const spotifyPlayer = writable<SpotifyApi|undefined>();

const clientId = "b6e8a090fcd3474ea29f034b6d3bf81c"

const devicesPollingInterval = 0.5 * 1000;

const scopes = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'streaming']

/// The devices that are available to the user
export const devices = derived(spotifyPlayer, (player, set: (value: Devices | undefined) => void) => {
    const interval = setInterval(async () => {
        if (player) {
            player.player.getAvailableDevices().then(devices => {
                set(devices);
            });
        }
    }, devicesPollingInterval);
    return () => clearInterval(interval);
});
 
export const playbackState:Readable<PlaybackState|undefined> = derived(spotifyPlayer, (player, set: (value: PlaybackState|undefined)=>void) => {
    const interval = setInterval(async () => {
        if (player) {
            set(await player.player.getCurrentlyPlayingTrack())
        }
    }, devicesPollingInterval);
    return () => clearInterval(interval);
});

export const currentTrack:Readable<TrackInfo|undefined> = derived(playbackState, ($playbackState, set) => {
    if ($playbackState) {
        let cleanup = spotifyPlayer.subscribe(async (player) => {
            let track = await player?.tracks.get($playbackState.item.id);
            set(track);
        });
        return cleanup;
    }
    return ()=>{};
});

export const activeDevice:Readable<Device|undefined> = derived(devices, ($devices:Devices|undefined)=>{
                return $devices?.devices.find((device) => device.is_active);
});

const redirectUri = mode === 'production' ?
 'https://bradphelan.github.io/spotify-bookmark' :
 'http://localhost:5173';

export const authSpotify = () => {
    SpotifyApi.performUserAuthorization(clientId, redirectUri, scopes, async (token: AccessToken) => {
        const sdk = SpotifyApi.withAccessToken(clientId, token);
        spotifyPlayer.set(sdk);
    });
}
