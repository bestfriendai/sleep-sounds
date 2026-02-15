import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAudioStore, SOUNDS } from '../lib/store';

const TIMER_OPTIONS = [15, 30, 60, 120];

export default function HomeScreen() {
  const { activeSounds, volumes, setVolume, isPlaying, setPlaying } = useAudioStore();
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sleep timer functionality
  useEffect(() => {
    if (timerMinutes && isPlaying) {
      timerRef.current = setTimeout(() => {
        setPlaying(false);
        setTimerMinutes(null);
      }, timerMinutes * 60 * 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timerMinutes, isPlaying]);

  const activeSoundsData = SOUNDS.filter(s => activeSounds.includes(s.id));

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🎛️ Sound Mixer</Text>
          <Text style={styles.subtitle}>Adjust individual volumes</Text>
        </View>

        <View style={styles.content}>
          {activeSoundsData.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No sounds selected</Text>
              <Text style={styles.emptySubtext}>Go back and select sounds to mix</Text>
            </View>
          ) : (
            activeSoundsData.map(sound => (
              <View key={sound.id} style={styles.sliderCard}>
                <Text style={styles.sliderEmoji}>{sound.emoji}</Text>
                <View style={styles.sliderContent}>
                  <Text style={styles.sliderLabel}>{sound.label}</Text>
                  <View style={styles.slider}>
                    <View style={[styles.sliderFill, { width: `${(volumes[sound.id] ?? 0.7) * 100}%`, backgroundColor: sound.color }]} />
                  </View>
                  <Text style={styles.volumeText}>{Math.round((volumes[sound.id] ?? 0.7) * 100)}%</Text>
                </View>
                <View style={styles.sliderButtons}>
                  <TouchableOpacity 
                    style={styles.sliderButton}
                    onPress={() => setVolume(sound.id, Math.max(0, (volumes[sound.id] ?? 0.7) - 0.1))}
                  >
                    <Text style={styles.sliderButtonText}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.sliderButton}
                    onPress={() => setVolume(sound.id, Math.min(1, (volumes[sound.id] ?? 0.7) + 0.1))}
                  >
                    <Text style={styles.sliderButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}

          <View style={styles.timerCard}>
            <Text style={styles.timerTitle}>⏱️ Sleep Timer</Text>
            <Text style={styles.timerSubtitle}>
              {timerMinutes ? `Playing for ${timerMinutes} minutes...` : 'Stop playback after:'}
            </Text>
            <View style={styles.timerOptions}>
              {TIMER_OPTIONS.map(mins => (
                <TouchableOpacity
                  key={mins}
                  style={[
                    styles.timerOption,
                    timerMinutes === mins && styles.timerOptionSelected
                  ]}
                  onPress={() => setTimerMinutes(timerMinutes === mins ? null : mins)}
                >
                  <Text style={[
                    styles.timerOptionText,
                    timerMinutes === mins && styles.timerOptionTextSelected
                  ]}>
                    {mins < 60 ? `${mins} min` : `${mins / 60} hr`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {timerMinutes && (
              <TouchableOpacity 
                style={styles.cancelTimer}
                onPress={() => setTimerMinutes(null)}
              >
                <Text style={styles.cancelTimerText}>Cancel Timer</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B4B' },
  header: { padding: 24, backgroundColor: '#312E81', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { fontSize: 14, color: '#A5B4FC', marginTop: 4 },
  content: { padding: 20 },
  emptyState: { alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 18, color: '#FFFFFF', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#A5B4FC' },
  sliderCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#312E81', padding: 16, borderRadius: 12, marginBottom: 12 },
  sliderEmoji: { fontSize: 32, marginRight: 16 },
  sliderContent: { flex: 1 },
  sliderLabel: { fontSize: 14, color: '#FFFFFF', marginBottom: 8 },
  slider: { height: 6, backgroundColor: '#4B5563', borderRadius: 3, overflow: 'hidden' },
  sliderFill: { height: '100%', borderRadius: 3 },
  volumeText: { fontSize: 12, color: '#A5B4FC', marginTop: 4, textAlign: 'right' },
  sliderButtons: { flexDirection: 'row', marginLeft: 12, gap: 8 },
  sliderButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#4B5563', alignItems: 'center', justifyContent: 'center' },
  sliderButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  timerCard: { backgroundColor: '#312E81', padding: 20, borderRadius: 12, marginTop: 8 },
  timerTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  timerSubtitle: { fontSize: 14, color: '#A5B4FC', marginBottom: 12 },
  timerOptions: { flexDirection: 'row', justifyContent: 'space-between' },
  timerOption: { flex: 1, padding: 10, marginHorizontal: 4, backgroundColor: '#4B5563', borderRadius: 8, alignItems: 'center' },
  timerOptionSelected: { backgroundColor: '#8B5CF6' },
  timerOptionText: { color: '#A5B4FC', fontSize: 14, fontWeight: '600' },
  timerOptionTextSelected: { color: '#FFFFFF' },
  cancelTimer: { marginTop: 12, alignItems: 'center' },
  cancelTimerText: { color: '#F87171', fontSize: 14 }
});
