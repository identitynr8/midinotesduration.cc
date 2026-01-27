# midinotesduration.cc

Real-time visualizer of notes duration from your MIDI controller.

## How to use

1. **Connect your MIDI controller**: Plug in your MIDI device to your computer.
2. **Open the site** (index.html) in a browser that supports WebMIDI.
3. **Select your device**: Choose your MIDI controller from the dropdown menu.
4. **Play**: Start playing your instrument. The histogram will update in real-time, showing the duration of each note you play.

## Features

- **Real-time Histogram**: Instantly see the distribution of your note durations.
- **Adjustable History**: Choose how many notes to keep in the history (100 to 10,000 notes).
- **Channel Selection**: Filter MIDI input by specific channels or listen to all channels.
- **Responsive Design**: Works on desktop browsers with WebMIDI support.

## Technical Details

- Powered by [WebMidi.js](https://webmidijs.org/) for MIDI integration.
- Uses [Plotly.js](https://plotly.com/javascript/) for high-performance data visualization.
- Built with [Pico CSS](https://picocss.com/) for a clean, minimal interface.
