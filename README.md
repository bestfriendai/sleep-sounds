# SleepSounds

Ambient sound mixer for sleep & focus built with Expo.

## Features

- 🎵 **Sound Mixing** - Combine multiple ambient sounds (rain, thunder, ocean, wind, fire, birds, forest, night, stream, cafe)
- 🎚️ **Volume Control** - Individual volume sliders for each sound
- ⏱️ **Sleep Timer** - Auto-stop playback after a set duration
- 🔄 **Presets** - Quick-start popular sound combinations

## Tech Stack

- [Expo](https://expo.dev) - React Native framework
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [expo-av](https://docs.expo.dev/versions/latest/sdk/av/) - Audio playback

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npx expo start
```

## Project Structure

```
app/              # Expo Router screens
  index.tsx       # Main sound selection screen
  home.tsx        # Mixer with volume controls & timer
  paywall.tsx    # Premium/upgrade screen
  _layout.tsx    # Root layout
lib/
  store.ts        # Zustand audio state store
hooks/
  useAudioPlayer.ts  # Audio playback hook
```

## Audio

The app uses free ambient sound samples from Pixabay. In production, replace `SOUND_URLS` in `hooks/useAudioPlayer.ts` with your own audio assets or CDN.

## License

MIT
