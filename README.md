# Spotify Bookmark

## Overview

Spotify Bookmark is a web application that allows users to bookmark specific positions in Spotify tracks. This application is built using SvelteKit and integrates with the Spotify Web API.

See [demo][spotifyBookmarkDemo].

## Features

- **Bookmark Tracks**: Users can bookmark specific positions in tracks and add notes to each bookmark.
- **Track Management**: Add, remove, and reset tracks in the bookmark list.
- **Spotify Integration**: Authenticate with Spotify and interact with the Spotify player.

## Project Structure

- **src**: Contains the source code for the application.
    - **lib**: Contains utility functions and stores.
        - `spotify.ts`: Manages Spotify API interactions and stores.
        - `storage.svelte.ts`: Provides a wrapper for local storage.
        - `tracks.svelte.ts`: Manages track and bookmark operations.
    - **routes**: Contains the SvelteKit routes.
        - `+layout.svelte`: Main layout for the application.
        - `+page.svelte`: Redirects to the tracks page.
        - `privacy/+page.svelte`: Privacy policy page.
        - `tracks/+page.svelte`: Displays the list of bookmarked tracks.
        - `tracks/[slug]/+page.svelte`: Displays details and bookmarks for a specific track.
- **.github/workflows**: Contains GitHub Actions workflows for deploying the application.
- **public**: Contains static assets.
- **styles**: Contains global styles.

## Installation

1. Clone the repository:
     ```sh
     git clone https://github.com/bradphelan/spotify-bookmark.git
     cd spotify-bookmark
     ```

2. Install dependencies:
     ```sh
     npm install
     ```

3. Run the development server:
     ```sh
     npm run dev
     ```

## Deployment

The application can be deployed to GitHub Pages using the provided GitHub Actions workflow. Ensure the `base` path in `svelte.config.js` is set correctly for production.

## Configuration

- **.npmrc**: Enforces strict engine compatibility.
- **.prettierrc**: Configuration for Prettier code formatting.
- **.gitignore**: Specifies files and directories to ignore in Git.
- **postcss.config.js**: Configuration for PostCSS.
- **tailwind.config.ts**: Configuration for Tailwind CSS.
- **vite.config.ts**: Configuration for Vite.
- **tsconfig.json**: TypeScript configuration.

## License

This project is licensed under the MIT License.

For more information, visit the [GitHub repository](https://github.com/bradphelan/spotify-bookmark).


[spotifyBookmarkDemo]: https://bradphelan.github.io/spotify-bookmark/