import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAudioStore, SOUNDS, PRESETS } from '../lib/store';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

export default function IndexScreen() {
  const router = useRouter();
  const { activeSounds, isPlaying, toggleSound, loadPreset } = useAudioStore();
  const { togglePlayPause } = useAudioPlayer();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>😴 SleepSounds</Text>
          <Text style={styles.subtitle}>Ambient sounds for better sleep</Text>
        </View>

        <View style={styles.nowPlaying}>
          {activeSounds.length > 0 ? (
            <>
              <Text style={styles.nowPlayingLabel}>Now Playing</Text>
              <Text style={styles.nowPlayingSounds}>
                {activeSounds.map(id => SOUNDS.find(s => s.id === id)?.emoji).join(' ')}
              </Text>
            </>
          ) : (
            <Text style={styles.tapToStart}>Tap sounds below to start mixing</Text>
          )}
        </View>

        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.playButton, activeSounds.length === 0 && styles.playButtonDisabled]} 
            onPress={togglePlayPause}
            disabled={activeSounds.length === 0}
          >
            <Text style={styles.playButtonText}>{isPlaying ? '⏸️ Pause' : '▶️ Play'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.mixerButton}
            onPress={() => router.push('/home')}
          >
            <Text style={styles.mixerButtonText}>🎛️ Open Mixer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.soundsGrid}>
          <Text style={styles.sectionTitle}>Choose Sounds</Text>
          <View style={styles.grid}>
            {SOUNDS.map(sound => (
              <TouchableOpacity
                key={sound.id}
                style={[
                  styles.soundButton,
                  activeSounds.includes(sound.id) && { backgroundColor: sound.color, borderColor: sound.color }
                ]}
                onPress={() => toggleSound(sound.id)}
              >
                <Text style={styles.soundEmoji}>{sound.emoji}</Text>
                <Text style={[styles.soundLabel, activeSounds.includes(sound.id) && { color: '#FFF' }]}>{sound.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.presets}>
          <Text style={styles.sectionTitle}>Popular Mixes</Text>
          {PRESETS.map(preset => (
            <TouchableOpacity 
              key={preset.id} 
              style={styles.presetButton} 
              onPress={() => loadPreset(preset.sounds)}
            >
              <Text style={styles.presetEmoji}>{preset.emoji}</Text>
              <Text style={styles.presetLabel}>{preset.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.premiumButton} onPress={() => router.push('/paywall')}>
          <Text style={styles.premiumButtonText}>⭐ Premium: AI Soundscapes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B4B' },
  header: { padding: 24, paddingTop: 16, backgroundColor: '#312E81', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { fontSize: 14, color: '#A5B4FC', marginTop: 4 },
  nowPlaying: { padding: 32, alignItems: 'center', backgroundColor: '#312E81', marginHorizontal: 16, marginTop: -12, borderRadius: 16 },
  nowPlayingLabel: { fontSize: 12, color: '#A5B4FC', marginBottom: 8 },
  nowPlayingSounds: { fontSize: 48 },
  tapToStart: { fontSize: 16, color: '#A5B4FC' },
  controls: { flexDirection: 'row', padding: 16, gap: 12 },
  playButton: { flex: 1, backgroundColor: '#8B5CF6', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  playButtonDisabled: { backgroundColor: '#4B5563' },
  playButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  mixerButton: { flex: 1, backgroundColor: '#3730A3', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  mixerButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  soundsGrid: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  soundButton: { width: '31%', backgroundColor: '#312E81', padding: 16, borderRadius: 16, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  soundEmoji: { fontSize: 32, marginBottom: 4 },
  soundLabel: { fontSize: 12, color: '#A5B4FC', fontWeight: '600' },
  presets: { padding: 20, paddingTop: 0 },
  presetButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#312E81', padding: 16, borderRadius: 12, marginBottom: 8 },
  presetEmoji: { fontSize: 24, marginRight: 12 },
  presetLabel: { fontSize: 16, color: '#FFFFFF', fontWeight: '500' },
  premiumButton: { margin: 16, padding: 16, backgroundColor: '#4C1D95', borderRadius: 12, alignItems: 'center' },
  premiumButtonText: { color: '#E9D5FF', fontSize: 16, fontWeight: '600' }
});
