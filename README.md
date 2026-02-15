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

## API Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Audio API (optional - for custom sound library)
AUDIO_API_KEY=your_audio_api_key
AUDIO_API_URL=https://api.sleepsounds.com/v1

# Sound CDN (for production audio assets)
SOUND_CDN_URL=https://cdn.sleepsounds.com
```

### RevenueCat Configuration

1. Create an account at [RevenueCat.com](https://revenuecat.com)
2. Create products in App Store Connect / Google Play Console:
   - Monthly: $2.99/month - `sleepsounds_monthly`
   - Annual: $14.99/year - `sleepsounds_annual`
3. Configure products in RevenueCat dashboard
4. Add your API key:

```typescript
// src/services/purchases.ts
export const REVENUECAT_API_KEY = 'your_revenuecat_public_key';
```
