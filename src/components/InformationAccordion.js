import "../App.css";
import Accordion from "react-bootstrap/Accordion";

export const InformationAccordion = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>What does this app do?</Accordion.Header>
        <Accordion.Body>
          <h3>Gets the mood of your music</h3>
          <p>
            Just login to spotify; search for song, album, or playlist (public
            or private); the app will tell you whether the selection is angry,
            happy, chill, or sad.
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey='1'>
        <Accordion.Header>
          How does it find the "mood" of a piece of music?
        </Accordion.Header>
        <Accordion.Body>
          <h3>With Spotify audio metrics</h3>
          <p>
            Spotify's API has an endpoint that provides data on the audio of a
            given track. Two of the provided metrics are valence and energy
            which are used the graph the selected songs.
          </p>
          <h4>Valence?</h4>
          <p>
            "A measure from 0.0 to 1.0{' '}
            <b>describing the musical positiveness conveyed by a track</b>.
            Tracks with high valence sound more positive (e.g. happy, cheerful,
            euphoric), while tracks with low valence sound more negative (e.g.
            sad, depressed, angry)." -{' '}
            <a href='https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features'>
              Spotify API Documentation
            </a>
          </p>
          <h4>Energy?</h4>
          <p>
            "Energy is a measure from 0.0 to 1.0 and{' '}
            <b>represents a perceptual measure of intensity and activity</b>.
            Typically, energetic tracks feel fast, loud, and noisy. For example,
            death metal has high energy, while a Bach prelude scores low on the
            scale. Perceptual features contributing to this attribute include
            dynamic range, perceived loudness, timbre, onset rate, and general
            entropy." -{' '}
            <a href='https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features'>
              Spotify API Documentation
            </a>
            <h4>Method</h4>
            <p>
              As you can the graph works with valence on the X-Axis and energy
              on the Y-Axis, and songs are graphed accordingly.
            </p>
            <ul>
              <li>
                <b>Happy:</b> High valence (positive) and high energy.
              </li>
              <li>
                <b>Chill:</b> High valence (positive) and low energy.
              </li>
              <li>
                <b>Sad:</b> Low valence (negative) and low energy.
              </li>
              <li>
                <b>Angry:</b> Low valence (negative) and high energy.
              </li>
            </ul>
          </p>
          <h4>Disclaimer</h4>
          <p>
            These two audio metrics from Spotify{' '}
            <b>do not take into account lyrical content</b>
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey='2'>
        <Accordion.Header>Who made this?</Accordion.Header>
        <Accordion.Body>
          My name is Will! You can check me out at my{' '}
          <a href=''>personal site</a>, on{' '}
          <a href='https://www.linkedin.com/in/will-arthur-614a08171/'>
            Linkedin
          </a>
          , or on <a href='https://github.com/warthurii'>Github</a>.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
