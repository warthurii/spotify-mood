export async function getAlbum(token, item) {
  let id = item.replace("spotify:album:", "");
  let url = encodeURI(`https://api.spotify.com/v1/albums/${id}`);

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error("Response Not Ok");
    }
    return response.json();
  });
}

export function getAudioFeaturesTrack(token, item) {
  let id = item.replace("spotify:track:", "");
  let url = encodeURI(`https://api.spotify.com/v1/audio-features/${id}`);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error("Response Not Ok");
    }
    return response.json();
  });
}

export async function getTrack(token, item) {
  let id = item.replace("spotify:track:", "");
  let url = encodeURI(`https://api.spotify.com/v1/tracks/${id}`);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error("Response Not Ok");
    }
    return response.json();
  });
}

export async function getAlbumsTracks(token, item) {
  let id = item.replace("spotify:album:", "");
  let url = encodeURI(`https://api.spotify.com/v1/albums/${id}/tracks`);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error("Response Not Ok");
    }
    return response.json();
  });
}
