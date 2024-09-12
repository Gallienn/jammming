const clientId = 'd234b55a4b894fd0ba8e4a4d8ff7fef0';
const clientSecret = '8a74293d68c1422cbbab3e7df4d0fbfc';
const redirectUri = 'http://localhost:3000';
let accessToken = '';

const Spotify = { 

    getAccessToken() {
        // Token is stored
        if(accessToken) {
            console.log('Token is stored')
            return accessToken;
        }

        // Token isn't stored ; It's in the URL
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch) {
            console.log(`Token isn't stored ; It's in the URL`);
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }

        // Token isn't stored ; It's not in the URL 
        console.log(`Token isn't stored ; It's not in the URL`);
        let tokenURL = `https://accounts.spotify.com/authorize?`
        tokenURL += `client_id=${clientId}`;
        tokenURL += `&response_type=token`;
        tokenURL += `&redirect_uri=${redirectUri}`
        tokenURL += `&scope=playlist-modify-public`;
        window.location = tokenURL;
    },

    async search(query) {
        console.log(`Function search() starting...`);
        console.log(`Argument is: ${query}\n`);
    
        try {
            // Get the token
            accessToken = Spotify.getAccessToken();
            console.log(`Token is: ${accessToken}`);

            // Get the data
            const encodedQuery = encodeURIComponent(query);
            const queryURL = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=15`;
            const response = await fetch(queryURL, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${accessToken}`}
            });

            // Check the HTTP status
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();

            //Format the data
            console.log(data);
            const tracks = data.tracks.items.map(({id, name, album, artists, uri}) => ({
                id, 
                name,
                album: album.name,
                artist: artists[0].name,
                uri
            }));
            console.log(tracks);
            return tracks;

        } catch(err) {
            console.error('Error: ' + err);
        }
    },

    async savePlaylist(playlistTitle, playlist) {
        console.log(`Function savePlaylist() starting...`);
        console.log(`Argument is: ${playlistTitle}\n`);

        try {
            // Step 1: Get the user's ID
            // Get the token
            accessToken = Spotify.getAccessToken();
            console.log(`Token is: ${accessToken}`);

            // Get the data
            const userURL = `https://api.spotify.com/v1/me`;
            let response = await fetch(userURL, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${accessToken}`}
            });

            // Check the HTTP status
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            let data = await response.json();

            // Format the data
            const userId = data.id;
            console.log(`User's ID is: ${userId}`);

            // Step 2: Create the playlist
            // Post the data
            const newPlaylistURL = `https://api.spotify.com/v1/users/${userId}/playlists`;
            response = await fetch(newPlaylistURL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: playlistTitle,
                    public: true
                })
            })

            // Check the HTTP status
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            console.log('Playlist has been created...');

            // Format the data
            data = await response.json();
            const playlistId = data.id;

            // Step 3: Add tracks to the playlist
            // Prepare the data
            playlist = playlist.map(({uri}) => uri);

            // Post the data
            const addItemsURL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
            response = await fetch(addItemsURL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uris: playlist,
                })
            })

            // Check the HTTP status
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            console.log('Tracks have been added...');

        } catch(err) {
            console.error(err);
        }
    }

};




// const createPlaylist = async (playlistTitle, authCode) => {
//     try {
//         // Get the user ID
//         const userId = await getUserId(authCode);
//         // Get the token
//         accessToken = await getAccessToken(authCode);

//         // Encode the data
//         const encodedPlaylistTitle = encodeURIComponent(playlistTitle);
//         console.log(encodedPlaylistTitle);

//         // Post the data
//         const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
//         const response = await fetch(endpoint, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: `name=${encodedPlaylistTitle}`
//         })

//         // Check HTTP status
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
//     } catch(err) {
//         console.error('Error: ' + err);
//     }
// }

export default Spotify;