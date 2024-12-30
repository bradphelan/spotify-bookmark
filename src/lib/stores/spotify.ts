import { writable } from 'svelte/store';
import { SpotifyApi, type AccessToken } from '@spotify/web-api-ts-sdk';

export const spotifyPlayer = writable<SpotifyApi|undefined>();
export const isPlayerReady = writable(false);
export const isLoginInProgress = writable(false);
const clientId = "b6e8a090fcd3474ea29f034b6d3bf81c"
const spotifyStorageKey = "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token"
const scopes = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'streaming']

const redirectUri = 'http://localhost:5173';

export const authSpotify = () => {
    SpotifyApi.performUserAuthorization(clientId, redirectUri, scopes, async (token: AccessToken) => {
        const sdk = SpotifyApi.withAccessToken(clientId, token);
        spotifyPlayer.set(sdk);
        isPlayerReady.set(true);
        app.current.isLoginInProgress = false;
    });
}
