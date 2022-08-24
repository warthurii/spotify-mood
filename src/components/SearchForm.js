import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import { Input, List, Avatar, Card } from "antd";
import "antd/dist/antd.min.css";
import {
  getAlbumData,
  getItemObject,
  getTrackData,
  getPlaylistData,
  createUrl,
} from '../utils';
import { getAudioFeaturesTrack } from '../api';

export const SearchForm = ({ token, setItem, searching, setSearching, setData }) => {
  const [searchType, setSearchType] = useState('0');
  const [searchResults, setSearchResults] = useState(null);
  const { Search } = Input;

  const selectChangeHandler = (e) => {
    setSearchType(e.target.value);
  };

  const handleChange = (query) => {
    if (searchType == '0') {
      getTrackSearchResults(query);
    } else if (searchType == '1') {
      getAlbumSearchResults(query);
    } else if (searchType == '2') {
      getPlaylistSearchResults(query);
    }
  };

  const handleClick = (e, key) => {
    setSearching(false);
    getItemObject(token, key).then((x) => {
      setItem(x);
    });
    if (key.includes('track')) {
      getTrackData(token, key).then((x) => {
        setData([x]);
      });
    } else if (key.includes('album')) {
      getAlbumData(token, key).then((x) => setData(x));
    } else if (key.includes('playlist')) {
      getPlaylistData(token, key).then((x) => setData(x));
    }
  };

  const handleTextClick = () => {
    setSearching(!searching);
  };

  const getTrackSearchResults = (query) => {
    fetch(createUrl('track', query), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error('Response Not Ok');
        }
        return response;
      })
      .then((response) => response.json())
      .then(({ tracks }) => {
        const results = [];
        tracks.items.forEach((element) => {
          let artists = [];
          element.artists.forEach((artist) => artists.push(artist.name));
          results.push(
            <List.Item
              key={element.uri}
              onClick={(e) => handleClick(e, element.uri)}
            >
              <List.Item.Meta
                style={{ cursor: 'pointer' }}
                avatar={
                  <Avatar
                    shape='square'
                    size='large'
                    src={element.album.images[0].url}
                  />
                }
                title={<p href='https://ant.design'>{element.name}</p>}
                description={artists.join(', ')}
              />
            </List.Item>
          );
        });
        setSearchResults(results);
      })
      .catch((error) => setSearchResults(null));
  };

  const getAlbumSearchResults = (query) => {
    const searchQuery = query;
    fetch(createUrl('album', query), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error('Response Not Ok');
        }
        return response;
      })
      .then((response) => response.json())
      .then(({ albums }) => {
        const results = [];
        albums.items.forEach((element) => {
          let artists = [];
          element.artists.forEach((artist) => artists.push(artist.name));
          results.push(
            <List.Item
              key={element.uri}
              onClick={(e) => handleClick(e, element.uri)}
            >
              <List.Item.Meta
                style={{ cursor: 'pointer' }}
                avatar={
                  <Avatar
                    shape='square'
                    size='large'
                    src={element.images[0].url}
                  />
                }
                title={<p href='https://ant.design'>{element.name}</p>}
                description={artists.join(', ')}
              />
            </List.Item>
          );
        });
        setSearchResults(results);
      })
      .catch((error) => setSearchResults(null));
  };

  const getPlaylistSearchResults = (query) => {
    const searchQuery = query;
    fetch(createUrl('playlist', query), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error('Response Not Ok');
        }
        return response;
      })
      .then((response) => response.json())
      .then(({ playlists }) => {
        const results = [];
        playlists.items.forEach((element) => {
          results.push(
            <List.Item
              key={element.uri}
              onClick={(e) => handleClick(e, element.uri)}
            >
              <List.Item.Meta
                style={{ cursor: 'pointer' }}
                avatar={
                  <Avatar
                    shape='square'
                    size='large'
                    src={element.images[0].url}
                  />
                }
                title={<p href='https://ant.design'>{element.name}</p>}
                description={element.owner.displayName}
              />
            </List.Item>
          );
        });
        setSearchResults(results);
      })
      .catch((error) => setSearchResults(null));
  };

  // const createUrl = (type, searchQuery) => {
  //   if (type === "0" || type === "1") {
  //     const queryUrl = encodeURI(`q=${searchQuery}`);
  //     const typeUrl = encodeURI(type === "0" ? "track" : "album");
  //     return `https://api.spotify.com/v1/search?${queryUrl}&type=${typeUrl}`;
  //   }
  // };

  const SearchCards = () => {
    if (searchResults?.length > 0) {
      return (
        <Card>
          <List itemLayout='horizontal'>{searchResults}</List>
        </Card>
      );
    } else {
      return <Card hidden={true} />;
    }
  };

  return (
    <>
      <Col>
        <Form.Select
          value={searchType}
          onChange={(e) => selectChangeHandler(e)}
        >
          <option value='0'>Song</option>
          <option value='1'>Album</option>
          <option value='2'>Playlist</option>
        </Form.Select>
      </Col>
      <Col xs={8}>
        <Form.Control
          onClick={handleTextClick}
          onChange={(e) => handleChange(e.target.value)}
        />
        {searching && <SearchCards />}
      </Col>
    </>
  );
};;
