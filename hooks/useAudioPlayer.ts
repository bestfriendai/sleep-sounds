import { useEffect, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import { useAudioStore, SOUNDS } from '../lib/store';

// Map sound IDs to demo audio URLs (using free sound samples)
// In production, these would be local assets or your own CDN
const SOUND_URLS: Record<string, string> = {
  rain: 'https://cdn.pixabay.com/audio/2022/05/13/audio_257112c5eb.mp3',
  thunder: 'https://cdn.pixabay.com/audio/2022/10/30/audio_1daf0a1c99.mp3',
  waves: 'https://cdn.pixabay.com/audio/2022/06/07/audio_638d02a667.mp3',
  wind: 'https://cdn.pixabay.com/audio/2022/03/10/audio_f47287e8e0.mp3',
  fire: 'https://cdn.pixabay.com/audio/2021/08/09/audio_3b9e867684.mp3',
  birds: 'https://cdn.pixabay.com/audio/2022/06/17/audio_7e46c1d1e6.mp3',
  forest: 'https://cdn.pixabay.com/audio/2021/09/07/audio_3ac73e3a1d.mp3',
  night: 'https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3',
  stream: 'https://cdn.pixabay.com/audio/2022/02/07/audio_3dde658d6c.mp3',
  cafe: 'https://cdn.pixabay.com/audio/2022/10/30/audio_6547d71d37.mp3',
};

interface SoundObject {
  sound: Audio.Sound;
  isLoaded: boolean;
}

export function useAudioPlayer() {
  const soundObjects = useRef<Record<string, SoundObject>>({});
  const { activeSounds, volumes, isPlaying, setPlaying } = useAudioStore();
  
  // Initialize audio mode
  useEffect(() => {
    async function setupAudio() {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
    }
    setupAudio();
  }, []);
  
  // Load/unload sounds based on activeSounds
  useEffect(() => {
    const loadSounds = async () => {
      const currentIds = Object.keys(soundObjects.current);
      const newSounds = activeSounds.filter(id => !currentIds.includes(id));
      const removedSounds = currentIds.filter(id => !activeSounds.includes(id));
      
      // Unload removed sounds
      for (const id of removedSounds) {
        const obj = soundObjects.current[id];
        if (obj?.sound) {
          await obj.sound.unloadAsync();
        }
        delete soundObjects.current[id];
      }
      
      // Load new sounds
      for (const id of newSounds) {
        const url = SOUND_URLS[id];
        if (!url) continue;
        
        try {
          const { sound } = await Audio.Sound.createAsync(
            { uri: url },
            { 
              isLooping: true, 
              volume: volumes[id] ?? 0.7,
              shouldPlay: isPlaying 
            }
          );
          soundObjects.current[id] = { sound, isLoaded: true };
        } catch (error) {
          console.error(`Failed to load sound ${id}:`, error);
        }
      }
    };
    
    loadSounds();
    
    return () => {
      // Cleanup on unmount
      Object.values(soundObjects.current).forEach(async (obj) => {
        if (obj.sound) {
          await obj.sound.unloadAsync();
        }
      });
      soundObjects.current = {};
    };
  }, [activeSounds]);
  
  // Update volumes when they change
  useEffect(() => {
    Object.entries(volumes).forEach(async ([id, volume]) => {
      const obj = soundObjects.current[id];
      if (obj?.sound) {
        await obj.sound.setVolumeAsync(volume);
      }
    });
  }, [volumes]);
  
  // Play/pause control
  useEffect(() => {
    const updatePlayback = async () => {
      for (const obj of Object.values(soundObjects.current)) {
        if (obj.sound) {
          if (isPlaying) {
            const status = await obj.sound.getStatusAsync();
            if (status.isLoaded && !status.isPlaying) {
              await obj.sound.playAsync();
            }
          } else {
            const status = await obj.sound.getStatusAsync();
            if (status.isLoaded && status.isPlaying) {
              await obj.sound.pauseAsync();
            }
          }
        }
      }
    };
    updatePlayback();
  }, [isPlaying]);
  
  const togglePlayPause = useCallback(() => {
    if (activeSounds.length === 0) return;
    setPlaying(!isPlaying);
  }, [activeSounds.length, isPlaying, setPlaying]);
  
  return { togglePlayPause };
}
