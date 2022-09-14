# Spotify Your Mood :(:

## What does the app do?

### Gets the mood of your music
Just login to spotify; search for song, album, or playlist (public or private); the app will tell you whether the selection is angry, happy, chill, or sad.

## How does it find the "mood" of a piece of music?

### With Spotify audio metrics
Spotify's API has an endpoint that provides data on the audio of a given track. Two of the provided metrics are valence and energy which are used the graph the selected songs.

#### Valence?
"A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)." - [Spotify API Documentation](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features)

#### Energy?
"Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy." - [Spotify API Documentation](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features)

#### Method
As you can the graph works with valence on the X-Axis and energy on the Y-Axis, and songs are graphed accordingly.

- **Happy:** High valence (positive) and high energy.
- **Chill:** High valence (positive) and low energy.
- **Sad:** Low valence (negative) and low energy.
- **Angry:** Low valence (negative) and high energy.