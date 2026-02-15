import { create } from 'zustand';

export interface Sound {
  id: string;
  emoji: string;
  label: string;
  color: string;
  url?: string;
}

export const SOUNDS: Sound[] = [
  { id: 'rain', emoji: '🌧️', label: 'Rain', color: '#3B82F6' },
  { id: 'thunder', emoji: '⛈️', label: 'Thunder', color: '#8B5CF6' },
  { id: 'waves', emoji: '🌊', label: 'Ocean', color: '#06B6D4' },
  { id: 'wind', emoji: '💨', label: 'Wind', color: '#A7F3D0' },
  { id: 'fire', emoji: '🔥', label: 'Fire', color: '#F97316' },
  { id: 'birds', emoji: '🐦', label: 'Birds', color: '#10B981' },
  { id: 'forest', emoji: '🌲', label: 'Forest', color: '#22C55E' },
  { id: 'night', emoji: '🌙', label: 'Night', color: '#6366F1' },
  { id: 'stream', emoji: '💧', label: 'Stream', color: '#0EA5E9' },
  { id: 'cafe', emoji: '☕', label: 'Cafe', color: '#D97706' },
];

export interface Preset {
  id: string;
  emoji: string;
  label: string;
  sounds: string[];
}

export const PRESETS: Preset[] = [
  { id: 'rainy-night', emoji: '🌧️', label: 'Rainy Night', sounds: ['rain', 'thunder'] },
  { id: 'beach-vibes', emoji: '🏖️', label: 'Beach Vibes', sounds: ['waves', 'night'] },
  { id: 'forest-morning', emoji: '🌲', label: 'Forest Morning', sounds: ['forest', 'birds', 'stream'] },
];

interface AudioState {
  activeSounds: string[];
  volumes: Record<string, number>;
  isPlaying: boolean;
  toggleSound: (id: string) => void;
  setVolume: (id: string, volume: number) => void;
  setPlaying: (playing: boolean) => void;
  loadPreset: (sounds: string[]) => void;
  stopAll: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  activeSounds: [],
  volumes: {},
  isPlaying: false,
  
  toggleSound: (id: string) => set((state) => {
    const isActive = state.activeSounds.includes(id);
    if (isActive) {
      return {
        activeSounds: state.activeSounds.filter(s => s !== id),
        volumes: Object.fromEntries(
          Object.entries(state.volumes).filter(([key]) => key !== id)
        )
      };
    } else {
      return {
        activeSounds: [...state.activeSounds, id],
        volumes: { ...state.volumes, [id]: 0.7 }
      };
    }
  }),
  
  setVolume: (id: string, volume: number) => set((state) => ({
    volumes: { ...state.volumes, [id]: volume }
  })),
  
  setPlaying: (playing: boolean) => set({ isPlaying: playing }),
  
  loadPreset: (sounds: string[]) => set((state) => {
    const newVolumes: Record<string, number> = { ...state.volumes };
    sounds.forEach(id => {
      if (!newVolumes[id]) newVolumes[id] = 0.7;
    });
    return { 
      activeSounds: sounds,
      volumes: newVolumes
    };
  }),
  
  stopAll: () => set({ activeSounds: [], isPlaying: false, volumes: {} }),
}));
