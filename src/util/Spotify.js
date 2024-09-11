const clientId = 'd234b55a4b894fd0ba8e4a4d8ff7fef0';
const clientSecret = '8a74293d68c1422cbbab3e7df4d0fbfc';

const getAccessToken = async () => {
    const urlAccessToken = 'https://accounts.spotify.com/api/token';
    fetch (urlAccessToken, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        storeToken(data.access_token, data.expires_in)
    })
    .catch(error => console.error('Error: ' + error));
};

const search = async (query) => {
    let accessToken;
    if (isTokenExpired()) {
        await getAccessToken();
        accessToken = localStorage.getItem('accessToken');
    } else {
        accessToken = localStorage.getItem('accessToken');
    }
    let encodedQuery = encodeURIComponent(query);
    
    // Querying
    const urlQuery = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=10`;
    const response = await fetch(urlQuery, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${accessToken}`}
    });
    const data = await response.json();
    const tracks = data.tracks.items;
    return tracks;
};

const storeToken = (accessToken, expiresIn) => {
    const expirationTime = Date.now() + (expiresIn * 1000);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expirationTime', expirationTime);
};

const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('expirationTime');
    return Date.now() > expirationTime;
}

export {getAccessToken, search};