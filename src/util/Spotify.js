const clientId = 'd234b55a4b894fd0ba8e4a4d8ff7fef0';
const clientSecret = '8a74293d68c1422cbbab3e7df4d0fbfc';
const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
const redirectUri = 'http://localhost:3000';
let accessToken = '';

const getAuthorizationCode= () => {
    const responseType = 'code';
    const scope = 'playlist-modify-public';
    const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}`;
    window.location = accessURL;
}

const getAccessToken = async (authCode) => {
    if(accessToken) {return accessToken;}
    if(!authCode) {getAuthorizationCode();}

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${encodedCredentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${redirectUri}`
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
  
        accessToken = data.access_token;
        setTimeout(() => {
            accessToken = '';
        }, data.expires_in * 1000)
        return accessToken;

    } catch(err) { 
        console.error('Error: ' + err); 
    }
};

const search = async (query, authCode) => {
    console.log('Start of the search() function\nArguments are:\n' + query + '\n' + authCode);
    try {
        // Get the token
        accessToken = await getAccessToken(authCode);

        // Get the data
        const encodedQuery = encodeURIComponent(query);
        const queryURL = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=15`;
        const response = await fetch(queryURL, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${accessToken}`}
        });

        // Check HTTP status
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        //Format the data
        console.log(data);
        const tracks = data.tracks.items.map(({id, name, album, artists}) => ({
            id, 
            name,
            album: album.name,
            artist: artists[0].name
        }));
        console.log(tracks);
        return tracks;

    } catch(err) {
        console.error('Error: ' + err);
    }
};

const getUserId = async (authCode) => {
    try {
        // Get the token
        accessToken = await getAccessToken(authCode);

        // Get the data
        const userURL = `https://api.spotify.com/v1/me`;
        const response = await fetch(userURL, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${accessToken}`}
        });

        // Check HTTP status
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        //Format the data
        console.log(data);
        const userId = data.id;
        console.log(userId);
        return userId;

    } catch(err) {
        console.error('Error: ' + err);
    }
}

const createPlaylist = async (playlistTitle, authCode) => {
    try {
        // Get the user ID
        const userId = await getUserId(authCode);
        // Get the token
        accessToken = await getAccessToken(authCode);

        // Encode the data
        const encodedPlaylistTitle = encodeURIComponent(playlistTitle);
        console.log(encodedPlaylistTitle);

        // Post the data
        const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `name=${encodedPlaylistTitle}`
        })

        // Check HTTP status
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    } catch(err) {
        console.error('Error: ' + err);
    }
}

export {getAuthorizationCode, getAccessToken, createPlaylist, getUserId, search};