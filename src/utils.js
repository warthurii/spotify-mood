import { getTrack, getAlbum, getAudioFeaturesTrack, getAlbumsTracks } from "./api"

export const getItemObject = (token, key) => {
    let response;
    if (key.includes("track")) {
        return getTrack(token, key).then((response) => {
            return ({
                "key": key,
                "artist": response.artists[0].name,
                "name": response.name
            })
        });
    } else {
        return getAlbum(token, key).then((response) => {
            return ({
                "key": key,
                "artist": response.artists[0].name,
                "name": response.name
            })
        });
    }
};

// export const getTrackData = (token, key) => {
//     return getAudioFeaturesTrack(token, key).then((response) => {
//         return (
//             [
//                 {
//                     "x": response.valence * 100,
//                     "y": response.energy * 100
//                 }
//             ]
//         )
//     });
// }
export const getTrackData = async (token, key) => {
    const features = await getAudioFeaturesTrack(token, key);
    return {x: features.valence * 100, y: features.energy * 100};
};

// export const getAlbumData = (token, key) => {
//     let info = [];
//     return getAlbumsTracks(token, key).then((response) => {
//         response.items.forEach((track, index) => {
//             return getTrackData(token, track.id).then((response) => {
//                 info = info.concat(response);
//             });
//         })

//         return info;
//     });
// }
export const getAlbumData = async (token, key) => {
    const tracks = await getAlbumsTracks(token, key);
    const trackPromises = tracks.items.map(track => getTrackData(token, track.id));
    const info = await Promise.all(trackPromises);
    console.log(info);
    return info;
  }