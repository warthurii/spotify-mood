import {
  getTrack,
  getAlbum,
  getAudioFeaturesTrack,
  getAlbumsTracks,
  getPlaylist,
  getPlaylistTracks,
  getAudioFeaturesTracks,
} from './api';

export const getItemObject = (token, key) => {
  let response;
  if (key.includes('track')) {
    return getTrack(token, key).then((response) => {
      return {
        key: key,
        artist: response.artists[0].name,
        name: response.name,
      };
    });
  } else if (key.includes('album')) {
    return getAlbum(token, key).then((response) => {
      return {
        key: key,
        artist: response.artists[0].name,
        name: response.name,
      };
    });
  } else if (key.includes('playlist')) {
    return getPlaylist(token, key).then((response) => {
      return {
        key: key,
        artist: response.owner.disply_name,
        name: response.name,
      };
    });
  }
};

export const getTrackData = async (token, key) => {
  const features = await getAudioFeaturesTrack(token, key);
  return { x: features.valence, y: features.energy };
};

export const getTracksData = async (token, key) => {
  const features = await getAudioFeaturesTracks(token, key);
  console.log(features);
  return features.audio_features.map((track) => {
    return { x: track.valence, y: track.energy, key: track.uri };
  });
};

export const getAlbumData = async (token, key) => {
  const tracks = await getAlbumsTracks(token, key);
  const trackPromises = tracks.items.map((track) =>
    getTrackData(token, track.id)
  );
  const info = await Promise.all(trackPromises);
  return info;
};

export const getPlaylistData = async (token, key) => {
  const tracks = await getPlaylistTracks(token, key);
  let trackIds = '';
  tracks.items.forEach(
    (item) =>
      (trackIds =
        trackIds === ''
          ? trackIds.concat(`${item.track.id}`)
          : trackIds.concat(`,${item.track.id}`))
  );
  console.log(trackIds);
  const tracksPromise = getTracksData(token, trackIds);
  console.log(tracksPromise);
  const info = await tracksPromise;
  console.log(info);
  return info;
};

export const createUrl = (type, key) => {
  const queryUrl = encodeURI(`q=${key}`);
  const typeUrl = encodeURI(type);
  return `https://api.spotify.com/v1/search?${queryUrl}&type=${typeUrl}`;
};
